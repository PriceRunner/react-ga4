const { NODE_ENV } = process.env;

const options = NODE_ENV === "test" ? { targets: { node: "current" } } : {};

module.exports = {
  presets: [["@babel/preset-env", options]],
};
