import Prism from "prismjs";
import { replaceTabs } from "./code.js";

Prism.hooks.add("after-tokenize", (env) => {
  const { tokens } = env;

  // Convert double spaces + tabs to something that is retained when pasting code
  env.tokens = tokens.map((t) => (typeof t === "string" ? replaceTabs(t) : t));
});

export default Prism;
