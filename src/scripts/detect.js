if (!HTMLScriptElement.supports("importmap")) {
  console.warn(
    "import maps aren't supported in this browser. pigment requires import map support."
  );

  const warning = document.getElementById("warning");

  document.getElementById("close-button").addEventListener("click", () => {
    warning.close();
  });

  warning.showModal();
}
