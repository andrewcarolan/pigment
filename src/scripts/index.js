import Prism, { IMPORT_URL } from "../lib/prism.js";
import { splitLines, unescapeAmpersands } from "../lib/code.js";
import { debounce } from "../lib/throttle.js";

// const formatButton = document.getElementById("formatButton");
const outputElement = document.getElementById("output");
const inputElement = document.getElementById("input");
const languageSelect = document.getElementById("languageSelect");
const themeSelect = document.getElementById("themeSelect");
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

  const { parentElement } = outputElement;
  if (parentElement?.nodeName.toLowerCase() === "pre") {
    parentElement.setAttribute("class", `theme-${themeSelect.value}`);
  }

  setOutputSize();
  outputElement.innerHTML = highlighted;
};

const setOutputSize = () => {
  outputElement.style.fontSize = (sizeInput?.value ?? 12) + "pt";
};

const UPDATE_INTERVAL = 100;
const throttledFormat = debounce(format, UPDATE_INTERVAL);

formatButton.addEventListener("click", throttledFormat);
inputElement.addEventListener("input", throttledFormat);
languageSelect.addEventListener("change", throttledFormat);
themeSelect.addEventListener("change", throttledFormat);
lineNumbersOption.addEventListener("change", throttledFormat);

sizeInput.addEventListener(
  "change",
  debounce(() => {
    if (!outputElement.innerHTML) {
      format();
    } else {
      setOutputSize();
    }
  }, UPDATE_INTERVAL)
);
