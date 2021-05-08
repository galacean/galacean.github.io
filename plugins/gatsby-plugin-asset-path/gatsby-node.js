/*!
 * Based on 'gatsby-plugin-asset-path'(https://github.com/madecomfy/gatsby-plugin-asset-path)
 * Original Author: MadeComfy
 */

/* eslint no-console: 0 */

const fs = require("fs-extra");
const path = require("path");

/**
 * Removes the .map files
 * @see {@link https://next.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig}
 * @see {@link https://github.com/gatsbyjs/gatsby/blob/v2.0.0-alpha.20/packages/gatsby/src/utils/webpack.config.js#L411}
 * @see {@link https://github.com/gatsbyjs/gatsby/blob/v2.0.0-alpha.20/packages/gatsby/src/utils/webpack.config.js#L240}
 * @param {*} param0
 */
exports.onCreateWebpackConfig = (
  { stage, actions },
  { removeMapFiles },
) => {
  if (removeMapFiles === true && stage === "build-javascript") {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};

/**
 * Moves assets to assets folder
 * @see {@link https://next.gatsbyjs.org/docs/node-apis/#onPostBuild}
 */
 exports.onPostBuild = async (
  { pathPrefix }, // this is specified by the 'assetPrefix' parameter in gatsby-config (note 'asset' instead of 'path'!)
  {
    additionalPaths = [], // deprecated argument to prevent breaking change
    paths = ["static", "page-data"],
    fileTypes = ["js", "css"],
    files = [],
  },
) => {
  // this is for deploying to external domains...
  // it writes the files correctly with the domain coded into the generated files,
  // but prevents them from being written into an incorrect folder like `/public/.https:/foobar.netlify.com/assets/`
  if (pathPrefix.indexOf("//") !== -1) {
    // eslint-disable-next-line no-useless-escape
    pathPrefix = pathPrefix.replace(/^.*\/\/[^\/]+/, "");
  }

  const publicFolder = "./public";
  const assetFolder = path.join(publicFolder, `.${pathPrefix}`);

  if (additionalPaths.length) {
    console.warn(
      `gatsby-plugin-asset-path argument 'additionalPaths' is deprecated, use 'paths'`,
    );
  }

  if (pathPrefix === "") {
    console.error(`gatsby-plugin-asset-path requires both:
- 'assetPrefix' set in gatsby-config
- 'gatsby build' to be run with the '--prefix-paths' flag`);
  }

  if (paths.includes("icons")) {
    console.error(
      `gatsby-plugin-asset-path needs to copy 'icons' to work with 'gatsby-plugin-manifest'
do not add 'icons' to paths parameter!`,
    );
  }

  const move = (fileOrFolder) => {
    const currentPath = path.join(publicFolder, fileOrFolder);
    const newPath = path.join(assetFolder, fileOrFolder);
    try {
      if (fs.existsSync(currentPath)) {
        return fs.move(currentPath, newPath);
      }
    } catch (err) {
      console.error(err);
      return Promise.resolve();
    }
  };

  const filesExtensions = fileTypes.join("|");
  const filesRegex = RegExp(`.*.(${filesExtensions})$`);
  const filterFilesIn = (folder) =>
    fs.readdirSync(folder).filter((file) => filesRegex.test(file) || files.includes(file));

  const filesInPublicFolder = filterFilesIn(publicFolder);

  const thingsToCopy = ["icons"]
    .concat(paths)
    .concat(additionalPaths)
    .concat(filesInPublicFolder);

  // Copy all files to the new prefix
  await Promise.all(thingsToCopy.map(move));
};