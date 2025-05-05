import type { ExcalidrawFontFaceDescriptor } from "../Fonts";

console.log("🧪 Inter: registering Inter-Regular.woff2");

export const InterFontFaces: ExcalidrawFontFaceDescriptor[] = [
  {
    uri: new URL("./Inter-Regular.woff2", import.meta.url).href,
    descriptors: {
      style: "normal",
      weight: "400",
    },
  },
];
