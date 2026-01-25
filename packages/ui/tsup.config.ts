import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "tailwindcss"],
  // Copy CSS files to dist
  publicDir: "src",
  // Copy only CSS files
  assets: ["*.css"],
});
