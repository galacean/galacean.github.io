import { defineConfig } from "cypress";
import { compare } from "odiff-bin";

import fs from "fs";
import * as path from "path";

const downloadDirectory = path.join(__dirname, "cypress/downloads");
let isRunningInCommandLine = false;
export default defineConfig({
  e2e: {
    viewportWidth: 1440,
    viewportHeight: 810,
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 60000,
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("before:browser:launch", (browser, launchOptions) => {
        console.log(
          "launching browser %s is headless? %s",
          browser.name,
          browser.isHeadless
        );
        // supply the absolute path to an unpacked extension's folder
        // NOTE: extensions cannot be loaded in headless Chrome
        if (fs.existsSync("cypress/diff")) {
          fs.rmdirSync("cypress/diff", { recursive: true });
        }
        if (browser.family === "chromium") {
          launchOptions.preferences.default["download"] = {
            default_directory: downloadDirectory,
          };
          if (browser.isHeadless) {
            isRunningInCommandLine = true;
          }
          launchOptions.args.push("--force-device-scale-factor=2");
          return launchOptions;
        }
      }),
        on("task", {
          async compare({ fileName, options }) {
            fileName += ".png";
            const baseFolder = isRunningInCommandLine
              ? "cypress/fixtures/playground/headless/"
              : "cypress/fixtures/playground/headed/";
            const newFolder = path.join(
              "cypress/screenshots",
              isRunningInCommandLine ? options.specFolder : ""
            );
            const diffFolder = path.join("cypress/diff", options.specFolder);
            if (!fs.existsSync(diffFolder)) {
              fs.mkdirSync(diffFolder, { recursive: true });
            }
            const baseImage = path.join(baseFolder, fileName);
            const newImage = path.join(newFolder, fileName);
            const diffImage = path.join(diffFolder, fileName);
            console.log(
              "comparing base image %s to the new image %s",
              baseImage,
              newImage
            );
            if (options) {
              console.log("odiff options %o", options);
            }
            const started = +new Date();

            const result = await compare(
              baseImage,
              newImage,
              diffImage,
              options
            );
            const finished = +new Date();
            const elapsed = finished - started;
            console.log("odiff took %dms", elapsed);

            console.log(result);
            return result;
          },
          async compareScreenshot({ fileName, options }) {
            fileName += ".png";
            const baseFolder = isRunningInCommandLine
              ? "cypress/fixtures/playground/headless/"
              : "cypress/fixtures/playground/headed/";
            const newFolder = path.join(
              "cypress/downloads",
              isRunningInCommandLine ? options.specFolder : ""
            );
            const diffFolder = path.join("cypress/diff", options.specFolder);
            if (!fs.existsSync(diffFolder)) {
              fs.mkdirSync(diffFolder, { recursive: true });
            }
            const baseImage = path.join(baseFolder, fileName);
            const newImage = path.join(newFolder, "screenshot.png");
            const diffImage = path.join(diffFolder, fileName);
            console.log(
              "comparing base image %s to the new image %s",
              baseImage,
              newImage
            );
            if (options) {
              console.log("odiff options %o", options);
            }
            const started = +new Date();

            const result = await compare(
              baseImage,
              newImage,
              diffImage,
              options
            );
            const finished = +new Date();
            const elapsed = finished - started;
            console.log("odiff took %dms", elapsed);

            console.log(result);
            return result;
          },
        });
    },
  },
  chromeWebSecurity: false,
});
