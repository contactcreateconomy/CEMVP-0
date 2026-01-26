import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts", "src/**/*.tsx"],
  format: ["esm"],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "tailwindcss", "next", "convex", "@createconomy/*"],
  // Add "use client" to index.js since it exports client components (SignIn, SignUp)
  esbuildOptions(options, ctx) {
    if (ctx.format === "esm" && options.entryPoints?.includes?.("src/index.ts")) {
      options.banner = {
        js: '"use client";\n',
      };
    }
  },
});
