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
          color: "#ffffff",
          backgroundColor: "#0f1f10",
          backgroundImage:
            "linear-gradient(135deg, #0f1f10 60%, #162a17 100%)",
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
