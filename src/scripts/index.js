import Prism from "../lib/prism.js";
import { splitLines, unescapeAmpersands } from "../lib/code.js";

console.log(Prism);

const formatButton = document.getElementById("formatButton");
const outputElement = document.getElementById("output");
const inputElement = document.getElementById("input");

formatButton.addEventListener("click", () => {
  const language = "javascript";

  const highlighted = unescapeAmpersands(
    splitLines(
      Prism.highlight(inputElement.value, Prism.languages[language], language)
    )
  );

  console.log(highlighted);

  outputElement.setAttribute("class", `language-${language}`);
  outputElement.innerHTML = highlighted;
});
