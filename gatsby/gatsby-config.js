let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)
require("dotenv").config({
  path: `.env.${activeEnv}`,
})
module.exports = {
  siteMetadata: {
    title: `Landtx`,
    description: `Landtx gatsby site.`,
    author: `Alexander Fountain`,
    googleMapsKey: process.env.GOOGLE_MAPS_KEY,
    url: `https://landtx.sanity.com`,
    mainmenu: [
      {
        name: "About",
        link: "/about",
      },
      {
        name: "Property Listings",
        link: "/properties",
      },
      {
        name: "Market Activity",
        link: "/market-activity",
      },
      {
        name: "Resources",
        link: "/resources",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "84iv1ine",
        dataset: "production",
        watchMode: true,
        overlayDrafts: true,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_READ_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Gothic A1:400,700", "Open Sans:300,400,400i,700"],
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-fonts`,
    //   options: {
    //     fonts: [
    //       `Gothic A1\:400,700`,
    //       `Open Sans\:300,400,400i,700`, // you can also specify font weights and styles
    //     ],
    //     display: "swap",
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-NTJTH2M",
      },
    },
  ],
}
