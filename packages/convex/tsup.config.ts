import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["server.ts", "client.tsx", "schema.ts"],
  format: ["esm"],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["convex", "react", "react-dom"],
  esbuildOptions(options) {
    options.jsx = "automatic";
    options.jsxImportSource = "react";
  },
});
