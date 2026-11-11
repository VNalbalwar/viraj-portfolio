import { ImageResponse } from "next/og";
import { site } from "@/content/profile";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          color: "#f4f4f6",
          backgroundColor: "#0b0b0e",
          backgroundImage:
            "radial-gradient(circle at 82% 22%, #2d5bff 0%, #1b2347 38%, #0b0b0e 70%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 2, opacity: 0.85, display: "flex" }}>viraj-verse.vercel.app</div>
        <div style={{ fontSize: 118, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4, marginTop: 18, display: "flex", flexDirection: "column" }}>
          <span>VIRAJ</span>
          <span>NALBALWAR</span>
        </div>
        <div style={{ fontSize: 34, marginTop: 28, maxWidth: 820, display: "flex" }}>
          Cloud, Kubernetes, GPUs and Linux. Systems under pressure.
        </div>
      </div>
    ),
    size
  );
}
