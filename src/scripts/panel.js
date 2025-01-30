import { calculateRelativePosition } from "helpers/lib/rect.js";
import { throttle } from "helpers/lib/throttle.js";

const container = document.querySelector("main");
const divider = container.querySelector("#divider");
divider.classList.add("ready");

const [panel1, panel2] = document.querySelectorAll(".panel");

const handleMove = throttle((event) => {
  const [x] = calculateRelativePosition(container, event);

  const { width } = container.getBoundingClientRect();

  panel1.style.flexBasis = `${x}px`;
  panel2.style.flexBasis = `${width - x}px`;
}, 30);

let isListening = false;

divider.addEventListener("mousedown", () => {
  divider.classList.add("active");
  window.addEventListener("mousemove", handleMove);
  isListening = true;
});

window.addEventListener("mouseup", () => {
  if (isListening) {
    divider.classList.remove("active");
    window.removeEventListener("mousemove", handleMove);
    isListening = false;
  }
});
