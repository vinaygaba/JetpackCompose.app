const fs = require(`fs`);
const fetch = require(`node-fetch`);
const { buildClientSchema } = require(`graphql`);
const { createHttpLink } = require(`apollo-link-http`);

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.jetpackcompose.app`,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/data/",
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `UA-28159586-8`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Libre+Baskerville`, `Roboto`, `Playfair%20Display`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `github`,
        typeName: `GitHub`,
        createLink: () =>
          createHttpLink({
            uri: `https://api.github.com/graphql`,
            headers: {
              Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
            },
            fetch,
          }),
        createSchema: async () => {
          const json = JSON.parse(fs.readFileSync(`${__dirname}/github.json`));
          return buildClientSchema(json.data);
        },
      },
    },
    "gatsby-transformer-json",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
  ],
};
