const { NODE_ENV } = process.env;

const options =
  NODE_ENV !== "test"
    ? {
        /* corejs: "3",
        useBuiltIns: "entry",
        targets: {
          ie: "11",
        },
        modules: "umd", */
      }
    : { targets: { node: "current" } };

module.exports = {
  presets: [["@babel/preset-env", options]],
};
