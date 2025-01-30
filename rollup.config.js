// import { nodeResolve } from "@rollup/plugin-node-resolve";
import urlResolve from "rollup-plugin-url-resolve";

export default {
  input: "./src/scripts/index.js",
  output: {
    file: "./dist/scripts/bundle.js",
    format: "es",
  },
  plugins: [
    urlResolve(),
    // nodeResolve()
  ],
};
