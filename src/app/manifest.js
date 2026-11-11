import { site } from "@/content/profile";

export default function manifest() {
  return {
    name: site.name,
    short_name: "Viraj",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070a1c",
    theme_color: "#070a1c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
