import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/format.ts", "src/validation.ts", "src/tenant.ts", "src/logger.ts", "src/errors.ts"],
  format: ["esm"],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
});
