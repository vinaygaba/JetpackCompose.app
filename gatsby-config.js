module.exports = {
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
    "gatsby-transformer-json",
    "gatsby-plugin-react-helmet",
  ],
};
