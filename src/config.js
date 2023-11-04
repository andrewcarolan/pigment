const DEFAULT_CONFIG = {
  tabWidth: 2, // spaces
  outputDirectory: "build",
};

const config = {};

const setConfig = (property, value) => {
  config[property] = value;
};

const getConfig = () => Object.assign(DEFAULT_CONFIG, config);

module.exports = { setConfig, getConfig };
