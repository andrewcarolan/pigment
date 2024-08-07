const throttle = (func, interval) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date();
    if (now - lastCall >= interval) {
      func(...args);
      lastCall = now;
    }
  };
};

export default throttle;
