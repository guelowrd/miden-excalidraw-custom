import type { ExcalidrawFontFaceDescriptor } from "../Fonts";

console.log("🧪 IBM Plex Mono: registering IBMPlexMono-Regular.woff2");

export const IBMPlexMonoFontFaces: ExcalidrawFontFaceDescriptor[] = [
  {
    uri: new URL("./IBMPlexMono-Regular.woff2", import.meta.url).href,
    descriptors: {
      style: "normal",
      weight: "400",
    },
  },
];
