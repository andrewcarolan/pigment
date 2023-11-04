const Prism = require("prismjs");
const { replaceTabs } = require("./code");

Prism.hooks.add("after-tokenize", (env) => {
  const { tokens } = env;

  // Convert double spaces + tabs to something that is retained when pasting code
  env.tokens = tokens.map((t) => (typeof t === "string" ? replaceTabs(t) : t));
});

module.exports = Prism;
