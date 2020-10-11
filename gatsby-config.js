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
    "gatsby-transformer-json",
    "gatsby-plugin-react-helmet",
  ],
};
