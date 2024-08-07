import Prism from "prismjs";
import { replaceTabs } from "./code.js";

export const IMPORT_URL = "https://esm.sh/prismjs@1.29.0/";

Prism.hooks.add("after-tokenize", (env) => {
  const { tokens } = env;

  // Convert double spaces + tabs to something that is retained when pasting code
  env.tokens = tokens.map((t) => (typeof t === "string" ? replaceTabs(t) : t));
});

export default Prism;
