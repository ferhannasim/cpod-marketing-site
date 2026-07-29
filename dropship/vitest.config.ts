import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [{ enforce: "pre", ...mdx() }, react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.test.{ts,tsx}", "components/**/*.test.{ts,tsx}", "content/**/*.test.{ts,tsx}", "lib/**/*.test.{ts,tsx}", "scripts/**/*.test.mjs"],
  },
});
