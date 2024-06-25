import { default as babel, default as commonjs } from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import packageJson from "./package.json" assert { type: "json" };

const extensions = ["ts"];

export default {
  input: "./src/main.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    babel({
      extensions,
      include: ["packages/src/**/*"],
      exclude: /node_modules/,
      babelHelpers: "runtime",
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
  ],
};
