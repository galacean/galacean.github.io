import { recurse } from "cypress-recurse";

describe("Basic", () => {
  it("GLTF Basic", () => {
    cy.visit(`/mpa/gltf-basic.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
    ).as("gltfAsset");

    cy.wait("@gltfAsset", { timeout: 60000 });
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cy.get("#canvas").then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 200;
              cypressEnv.engine.update();
            }
            const imageName = `Basic_gltf-basic`;
            resolve(
              recurse(
                () => {
                  return cy
                    .get("canvas")
                    .screenshot(imageName, { overwrite: true })
                    .then(() => {
                      return cy.task("compare", {
                        fileName: imageName,
                        options: {
                          specFolder: Cypress.spec.name,
                        },
                      });
                    });
                },
                ({ match }) => match,
                {
                  limit: 3,
                }
              )
            );
          }, 1000);
        });
      });
    });
  });

  it("Scene Basic", () => {
    cy.screenShotOnly("Basic", "scene-basic");
  });

  it("Script Basic", () => {
    cy.visit(`/mpa/script-basic.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
    ).as("gltfAsset");

    cy.wait("@gltfAsset", { timeout: 60000 });
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine.pause();
      cy.get("#canvas").then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 200;
              cypressEnv.engine.update();
            }
            const imageName = `Basic_script-basic`;
            resolve(
              recurse(
                () => {
                  return cy
                    .get("#canvas")
                    .screenshot(imageName, { overwrite: true })
                    .then(() => {
                      return cy.task("compare", {
                        fileName: imageName,
                        options: {
                          specFolder: Cypress.spec.name,
                        },
                      });
                    });
                },
                ({ match }) => match,
                {
                  limit: 3,
                }
              )
            );
          }, 1000);
        });
      });
    });
  });

  it("Transform Basic", () => {
    cy.screenShotAfterRequest(
      "Basic",
      "transform-basic",
      "https://gw.alipayobjects.com/zos/OasisHub/267000040/4580/DuckCM.png"
    );
  });
});
