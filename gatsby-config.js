require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-dts-css-modules",
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: "u0ztoekrenxw",
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
};
