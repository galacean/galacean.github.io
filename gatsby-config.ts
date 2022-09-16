import type { GatsbyConfig } from "gatsby";

const DTS = require("./scripts/typedoc/tsfiles");
const { version, typedocSource } = require("./siteconfig.json");

const config: GatsbyConfig = {
  siteMetadata: {
    title: "OASIS ENGINE",
    description: "Out-of-box UI solution for enterprise applications",
    author: "Oasis Engine",
    siteUrl: "https://oasisengine.cn"
  },
  assetPrefix: `/${version}/asset`,
  plugins: [
    {
      resolve: "gatsby-plugin-asset-path",
      options: {
        removeMapFiles: true,
        fileTypes: ["js", "css", "txt", "chunk-map.json"],
        files: ["chunk-map.json", "webpack.stats.json"]
      }
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "/docs",
        path: `${__dirname}/docs/`,
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "/playground",
        path: `${__dirname}/playground/`,
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-autolink-headers",
          "gatsby-remark-img-warpper-p",
          {
            resolve: "gatsby-remark-oasis",
            options: {
              api: `/${version}/api/`,
              playground: `/${version}/examples#`,
              docs: `/${version}/docs/`
            }
          },
          {
            resolve: "gatsby-remark-component-parent2div",
            options: {
              components: ["Playground"],
              verbose: true
            }
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true
            }
          }
        ]
      }
    },
    "gatsby-plugin-sitemap",
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
          tsconfig: `${typedocSource}/tsconfig.json`
        }
      }
    },
    "gatsby-transformer-oasis-playground"
  ]
};
export default config;
