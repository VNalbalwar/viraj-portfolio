"use client";

import { THUMBS } from "./ProjectThumb";
import PatternThumb from "./PatternThumb";

/** Hand-made animated thumbnail when the project has one, else a generated pattern. */
export default function ProjectVisual({ thumbKey, id }) {
  const Thumb = thumbKey ? THUMBS[thumbKey] : null;
  return Thumb ? <Thumb /> : <PatternThumb id={id} />;
}
