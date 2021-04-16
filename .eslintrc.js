var path = require("path");

module.exports = {
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
