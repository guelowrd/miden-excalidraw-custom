import type { ExcalidrawFontFaceDescriptor } from "../Fonts";

console.log("🧪 Caveat: registering Caveat-Regular.woff2");

export const CaveatFontFaces: ExcalidrawFontFaceDescriptor[] = [
  {
    uri: new URL("./Caveat-Regular.woff2", import.meta.url).href,
    descriptors: {
      style: "normal",
      weight: "400",
    },
  },
];
