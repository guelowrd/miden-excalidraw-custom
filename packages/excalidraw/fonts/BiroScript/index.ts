import type { ExcalidrawFontFaceDescriptor } from "../Fonts";

console.log("🧪 Biro Script: registering biro-script.woff2");

export const BiroScriptFontFaces: ExcalidrawFontFaceDescriptor[] = [
  {
    uri: new URL("./biro-script.woff2", import.meta.url).href,
    descriptors: {
      style: "normal",
      weight: "400",
    },
  },
];
