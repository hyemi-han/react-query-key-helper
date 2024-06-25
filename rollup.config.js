import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json" assert { type: "json" };

export default {
  input: "./src/main.ts",
  output: {
    file: packageJson.module,
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
  ],
};
