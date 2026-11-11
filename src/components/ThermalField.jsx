"use client";

import { useEffect, useRef } from "react";

// ── Shaders ─────────────────────────────────────────────────────────────────
const VERT = `attribute vec2 p; varying vec2 uv; void main(){ uv = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }`;

// Heat simulation: diffuse, decay, and add heat where the pointer is.
const SIM = `precision mediump float;
varying vec2 uv; uniform sampler2D prev; uniform vec2 px; uniform vec2 aspect;
uniform vec3 s0; uniform vec3 s1; uniform vec3 s2;
float splat(vec3 s){ vec2 d = (uv - s.xy) * aspect; return s.z * exp(-dot(d, d) * 90.); }
void main(){
  float h = texture2D(prev, uv).r * .4
    + (texture2D(prev, uv + vec2(px.x, 0.)).r + texture2D(prev, uv - vec2(px.x, 0.)).r
     + texture2D(prev, uv + vec2(0., px.y)).r + texture2D(prev, uv - vec2(0., px.y)).r) * .15;
  h = max(0., h * .982 - .0035);
  h += splat(s0) + splat(s1) + splat(s2);
  gl_FragColor = vec4(min(h, 1.), 0., 0., 1.);
}`;

// Display: ambient drift + simulated heat, mapped through the thermal ramp,
// with thin isolines like a thermography export.
const DRAW = `precision mediump float;
varying vec2 uv; uniform sampler2D heat; uniform float t; uniform vec2 aspect;
uniform vec3 c0; uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 c4;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for(int i = 0; i < 4; i++){ v += a * noise(p); p = p * 2.03 + 7.1; a *= .5; } return v; }
vec3 ramp(float v){
  v = clamp(v, 0., 1.);
  if (v < .25) return mix(c0, c1, v / .25);
  if (v < .5) return mix(c1, c2, (v - .25) / .25);
  if (v < .75) return mix(c2, c3, (v - .5) / .25);
  return mix(c3, c4, (v - .75) / .25);
}
void main(){
  vec2 q = uv * aspect;
  float amb = fbm(q * 1.6 + vec2(t * .035, -t * .02));
  amb = smoothstep(.22, .82, amb) * .6;
  float v = amb + texture2D(heat, uv).r * .95;
  vec3 col = ramp(v);
  float iso = abs(fract(v * 9.) - .5);
  float line = 1. - smoothstep(.0, .03, iso);
  col = mix(col, ramp(v + .2), line * .7);
  gl_FragColor = vec4(col, 1.);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}
function program(gl, frag) {
  const p = gl.createProgram();
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.bindAttribLocation(p, 0, "p");
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  return p;
}
const hex = (h) => {
  const n = parseInt(h.trim().replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/**
 * Full-bleed thermal field. The pointer adds heat; it diffuses and decays
 * back to baseline. The readout times that recovery.
 */
export default function ThermalField() {
  const canvasRef = useRef(null);
  const heatRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl;
    try {
      gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    } catch {}
    if (!gl) return; // CSS gradient fallback stays visible.

    let sim, draw;
    try {
      sim = program(gl, SIM);
      draw = program(gl, DRAW);
    } catch (e) {
      console.warn("Thermal shader unavailable:", e.message);
      return;
    }
    canvas.dataset.live = "true";

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const SW = 160;
    let SH = 90;
    let targets = [];
    const makeTarget = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SW, SH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fb = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return { tex, fb };
    };

    let aspect = [1, 1];
    const resize = () => {
      const r = host.getBoundingClientRect();
      const scale = r.width < 700 ? 0.5 : 0.7;
      canvas.width = Math.max(2, Math.round(r.width * scale));
      canvas.height = Math.max(2, Math.round(r.height * scale));
      aspect = r.width >= r.height ? [r.width / r.height, 1] : [1, r.height / r.width];
      SH = Math.max(40, Math.min(360, Math.round((SW * r.height) / r.width)));
      targets.forEach((t) => {
        gl.deleteTexture(t.tex);
        gl.deleteFramebuffer(t.fb);
      });
      targets = [makeTarget(), makeTarget()];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let colors = [];
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = [0, 1, 2, 3, 4].map((i) => hex(cs.getPropertyValue(`--r${i}`)));
    };
    readColors();
    const mo = new MutationObserver(() => {
      readColors();
      if (reduce) frame(performance.now(), true);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Pointer state
    const ptr = { x: 0.5, y: 0.5, power: 0 };
    const local = { heat: 0, hotAt: 0, coolStart: 0, last: null };
    stateRef.current = local;
    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      ptr.x = (e.clientX - r.left) / r.width;
      ptr.y = 1 - (e.clientY - r.top) / r.height;
      ptr.power = 0.16;
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerdown", onMove, { passive: true });

    const U = (p, n) => gl.getUniformLocation(p, n);
    let visible = true;
    let raf = 0;
    let lastText = "";

    function frame(now, once) {
      const t = now / 1000;
      // two slow wandering sources keep the field alive without a pointer
      const a = [0.5 + 0.34 * Math.sin(t * 0.21), 0.6 + 0.26 * Math.cos(t * 0.17), 0.02];
      const b = [0.5 + 0.38 * Math.cos(t * 0.13 + 2), 0.62 + 0.26 * Math.sin(t * 0.19 + 1), 0.016];

      const [src, dst] = targets;
      gl.useProgram(sim);
      gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fb);
      gl.viewport(0, 0, SW, SH);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, src.tex);
      gl.uniform1i(U(sim, "prev"), 0);
      gl.uniform2f(U(sim, "px"), 1 / SW, 1 / SH);
      gl.uniform2f(U(sim, "aspect"), aspect[0], aspect[1]);
      gl.uniform3f(U(sim, "s0"), ptr.x, ptr.y, ptr.power);
      gl.uniform3f(U(sim, "s1"), a[0], a[1], a[2]);
      gl.uniform3f(U(sim, "s2"), b[0], b[1], b[2]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      targets.reverse();

      gl.useProgram(draw);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindTexture(gl.TEXTURE_2D, dst.tex);
      gl.uniform1i(U(draw, "heat"), 0);
      gl.uniform1f(U(draw, "t"), reduce ? 12 : t);
      gl.uniform2f(U(draw, "aspect"), aspect[0], aspect[1]);
      colors.forEach((c, i) => gl.uniform3f(U(draw, `c${i}`), c[0], c[1], c[2]));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Readout: a JS mirror of the same decay law at the pointer.
      if (ptr.power > 0) {
        local.heat = Math.min(1, local.heat + 0.09);
        local.coolStart = now;
        local.last = null;
      } else if (local.heat > 0) {
        local.heat = Math.max(0, local.heat * 0.972 - 0.0035);
        if (local.heat === 0) local.last = (now - local.coolStart) / 1000;
      }
      ptr.power = 0;
      const el = heatRef.current;
      if (el) {
        const text =
          local.heat > 0.6
            ? `interference on · heat ${local.heat.toFixed(2)}`
            : local.heat > 0
              ? `recovering · heat ${local.heat.toFixed(2)}`
              : local.last
                ? `back to baseline in ${local.last.toFixed(2)} s`
                : "baseline · move your cursor";
        if (text !== lastText) {
          el.textContent = text;
          lastText = text;
        }
      }
      if (!once && visible && !reduce) raf = requestAnimationFrame(frame);
    }

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) frame(performance.now(), true);
      else raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden;
      if (visible) start();
    });
    io.observe(host);
    const onVis = () => {
      visible = !document.hidden;
      if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onMove);
    };
  }, []);

  return (
    <>
      {/* CSS fallback shows until (or unless) WebGL takes over */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 72% 38%, var(--r2), transparent 70%), radial-gradient(45% 40% at 22% 70%, var(--r1), transparent 70%), var(--r0)",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 data-[live=true]:opacity-100"
      />
      <p
        className="readout absolute left-[clamp(1.25rem,4vw,3rem)] top-[4.5rem] z-10 flex sm:top-5 items-center gap-2 rounded-full px-3 py-1.5"
        style={{ background: "color-mix(in oklab, var(--t0) 78%, transparent)", color: "var(--ink)" }}
      >
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--r3)", animation: "pulse-dot 1.8s ease-in-out infinite" }}
        />
        <span ref={heatRef} aria-hidden>
          baseline · move your cursor
        </span>
        <span className="sr-only">Decorative thermal simulation that reacts to your cursor.</span>
      </p>
    </>
  );
}
