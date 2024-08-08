const throttle = (func, interval) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date();
    if (now - lastCall >= interval) {
      func(...args);
      lastCall = now;
    }
  };
};

const debounce = (func, interval) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, interval);
  };
};

export { throttle, debounce };
