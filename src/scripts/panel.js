import { calculateRelativePosition } from "https://esm.sh/gh/andrewcarolan/pico-player@v1.1.0/lib/rect.js";
import throttle from "https://esm.sh/gh/andrewcarolan/pico-player@v1.1.0/lib/throttle.js";

const calculateXOffset = (element, x) => {
  const { width } = element.getBoundingClientRect();

  const offset = x / width;

  return [offset, 1 - offset];
};

const container = document.querySelector("main");
const divider = container.querySelector("#divider");
divider.classList.add("ready");

const [panel1, panel2] = document.querySelectorAll(".panel");

const handleMove = throttle((event) => {
  const [x] = calculateRelativePosition(container, event);

  //   const [offset, remainder] = calculateXOffset(container, x);
  //   panel1.style.flex = offset;
  //   panel2.style.flex = remainder;

  const { width } = container.getBoundingClientRect();

  panel1.style.flexBasis = `${x}px`;
  panel2.style.flexBasis = `${width - x}px`;
}, 30);

let isListening = false;

divider.addEventListener("mousedown", () => {
  console.log("start");
  divider.classList.add("active");
  window.addEventListener("mousemove", handleMove);
  isListening = true;
});

window.addEventListener("mouseup", () => {
  if (isListening) {
    console.log("stop");
    divider.classList.remove("active");
    window.removeEventListener("mousemove", handleMove);
    isListening = false;
  }
});
