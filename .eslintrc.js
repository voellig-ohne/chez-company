var path = require("path");

module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: "react-app",
  plugins: ["graphql"],
  rules: {
    "graphql/template-strings": [
      "error",
      {
        env: "relay",
        tagName: "graphql",
        schemaJsonFilepath: path.resolve(
          __dirname,
          "src/__generated__/gatsby-introspection.json"
        ),
      },
    ],
  },
};
