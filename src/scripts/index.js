import Prism, { IMPORT_URL } from "../lib/prism.js";
import { splitLines, unescapeAmpersands } from "../lib/code.js";
import { debounce } from "../lib/throttle.js";

// const formatButton = document.getElementById("formatButton");
const outputElement = document.getElementById("output");
const inputElement = document.getElementById("input");
const languageSelect = document.getElementById("languageSelect");
const sizeInput = document.getElementById("sizeInput");
const lineNumbersOption = document.getElementById("lineNumbersOption");

const format = async () => {
  let language = languageSelect.value;

  if (!Object.keys(Prism.languages).includes(language)) {
    try {
      // attempt dynamic grammar import
      await import(`${IMPORT_URL}/components/prism-${language}.js`);
    } catch (error) {
      language = "javascript";
    }
  }

  let highlighted = Prism.highlight(
    inputElement.value,
    Prism.languages[language],
    language
  );

  if (lineNumbersOption.checked) {
    highlighted = splitLines(highlighted);
  }

  highlighted = unescapeAmpersands(highlighted);

  outputElement.setAttribute("class", `language-${language}`);
  outputElement.style.fontSize = (sizeInput?.value ?? 12) + "pt";
  outputElement.innerHTML = highlighted;
};

const throttledFormat = debounce(format, 100);

formatButton.addEventListener("click", throttledFormat);
inputElement.addEventListener("input", throttledFormat);
languageSelect.addEventListener("change", throttledFormat);
sizeInput.addEventListener("change", throttledFormat);
lineNumbersOption.addEventListener("change", throttledFormat);
