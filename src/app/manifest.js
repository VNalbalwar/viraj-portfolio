import { site } from "@/content/profile";

export default function manifest() {
  return {
    name: site.name,
    short_name: "Viraj",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0f1f10",
    theme_color: "#0f1f10",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
