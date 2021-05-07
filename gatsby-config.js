const DTS = require('./scripts/typedoc/tsfiles');
const siteConfig = require('./siteconfig.json')

module.exports = {
  siteMetadata: {
    title: 'OASIS ENGINE',
    description: 'Out-of-box UI solution for enterprise applications',
    author: 'Oasis Engine',
    siteUrl: 'https://oasisengine.cn',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-72788897-5',
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: '/docs',
        path: `${__dirname}/docs/`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: '/blog',
        path: `${__dirname}/blog/`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: '/playground',
        path: `${__dirname}/playground/`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-img-warpper-p',
          'gatsby-remark-oasis-playground',
          {
            resolve: "gatsby-remark-component-parent2div",
            options: {
              components: ["Playground"],
              verbose: true
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          },
          {
            resolve:"gatsby-remark-codepen",
            options: {
              theme: "light",
              height: 500,
              defaultTab: 'js,result'
            }
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: "gatsby-source-typedoc",
      options: {

        // Array of Typescript files to
        // include
        src: DTS,

        // Options passed to Typedoc Application
        // Usually corresponds to CLI args directly
        // See: https://typedoc.org/guides/options/
        // typedoc: {
        //   tsconfig: `${__dirname}/path/to/tsconfig.json`
        // }
        typedoc: {
          tsconfig: `${siteConfig.typedocSource}/tsconfig.json`
        }
      }
    },
    'gatsby-transformer-oasis-playground'
  ],
};
