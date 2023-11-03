const Prism = require("prismjs");

const TAB_STOP = "  ";

Prism.hooks.add("after-tokenize", (env) => {
  const { tokens } = env;

  // Convert double spaces to something that is retained when pasting into Slides
  // TODO: add the same behaviour for tabs (`\t`)
  env.tokens = tokens.map((t) =>
    typeof t === "string" ? t.replaceAll(TAB_STOP, "&nbsp; ") : t
  );
});

module.exports = Prism;
