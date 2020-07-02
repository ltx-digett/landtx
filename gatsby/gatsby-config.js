let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)
require("dotenv").config({
  path: `.env.${activeEnv}`,
})
module.exports = {
  siteMetadata: {
    title: `LANDTX`,
    description: `LANDTX gatsby site.`,
    author: `Alexander Fountain`,
    googleMapsKey: "AIzaSyCscj1R_Vnimtvx2zvMaVd4GxJPpxAFsOI",
    url: `https://www.landtx.com`,
    mainmenu: [
      {
        name: "About",
        link: "/mission-goals",
        submenu: [
          {
            name: "Mission & Goals",
            link: "/mission-goals",
          },
          {
            name: "Our Services",
            link: "/our-services",
          },
          {
            name: "Territory",
            link: "/territory",
          },
          {
            name: "Team",
            link: "/team",
          },
        ],
      },
      {
        name: "Property Listings",
        link: "/properties",
      },
      {
        name: "Market Activity",
        link: "/trend-graph",
        submenu: [
          {
            name: "Trend Graph",
            link: "trend-graph",
          },
          {
            name: "Territory Review 2019",
            link: "/market-activity/2019",
          },
          {
            name: "Territory Review 2018",
            link: "/market-activity/2018",
          },
          {
            name: "Territory Review 2017",
            link: "/market-activity/2017",
          },
          {
            name: "Territory Review 2016",
            link: "/market-activity/2016",
          },
          {
            name: "Territory Review 2015",
            link: "/market-activity/2015",
          },
          {
            name: "Territory Review 2014",
            link: "/market-activity/2014",
          },
          {
            name: "Territory Review 2013",
            link: "/market-activity/2013",
          },
          {
            name: "Territory Review 2012",
            link: "/market-activity/2012",
          },
          {
            name: "Territory Review 2011",
            link: "/market-activity/2011",
          },
          {
            name: "Territory Review 2010",
            link: "/market-activy/2010",
          },
          {
            name: "Territory Review 2009",
            link: "/market-activity/2009",
          },
          {
            name: "Territory Review 2008",
            link: "/market-activity/2008",
          },
          {
            name: "Territory Review 2007",
            link: "/market-activity/2007",
          },
          {
            name: "Territory Review 2006",
            link: "/market-activity/2006",
          },
          {
            name: "Territory Review 2005",
            link: "/market-activity/2005",
          },
        ],
      },
      {
        name: "Resources",
        link: "/resources",
      },
      {
        name: "Sold Properties",
        link: "/sold-properties",
      },
      {
        name: "Contact",
        link: "/contact-us",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-headers`,
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`react-dom`],
      },
    },
    `gatsby-plugin-flow`,
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
        name: `LANDTX`,
        short_name: `lANDTX`,
        start_url: `/`,
        background_color: `#2C2E29`,
        theme_color: `#2C2E29`,
        display: `standalone`,
        icon: `./src/images/fav.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "84iv1ine",
        dataset: "production",
        watchMode: false,
        overlayDrafts: false,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_READ_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/fav.png",

        // WebApp Manifest Configuration
        appName: null, // Inferred with your package.json
        appDescription: null,
        developerName: null,
        developerURL: null,
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#fff",
        display: "standalone",
        orientation: "any",
        version: "1.0",

        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: true,
          yandex: false,
          windows: false,
        },
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
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        importWorkboxFrom: `local`,
        globDirectory: "public",
        globPatterns: ["*/**"],
        cacheId: `gatsby-plugin-offline`,
        skipWaiting: true,
        clientsClaim: true,
        directoryIndex: "index.html",
      },
    },
    {
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: [
          "https://www.google-analytics.com",
          "https://fonts.gstatic.com",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-NTJTH2M",
      },
    },
  ],
}
