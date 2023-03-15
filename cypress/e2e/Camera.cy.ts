import { recurse } from "cypress-recurse";

describe("Camera", () => {
  //TODO need opt
  it("Free Controls", () => {
    cy.visit(`/mpa/controls-free.html`);
    cy.get("#canvas").trigger("keydown", { code: "KeyW" });
    cy.wait(3000);
    cy.get("#canvas").screenshot("Particle_particle-sprite-sheet", {
      overwrite: true,
    });
  });

  it("Culling Mask", () => {
    cy.visit("/mpa/culling-mask.html");
    cy.get("select").eq(0).select("Layer1");
    cy.get("select").eq(1).select("Layer2").blur();
    cy.get("#canvas").then(() => {
        return new Promise((resolve) => {
          cy.wait(1000);
          const imageName = "Camera_culling-mask";
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
              ({ match }) => match
            )
          );
        });
    });
  })

  it("Multi Camera", () => {
    cy.screenShotOnly("Camera", "multi-camera", 100, .85);
  })

  //TODO error
  it("Ortho Controls", () => {
    cy.screenShotWithoutPause("Camera", "ortho-control");
  })

  it("Orthographic Camera", () => {
    cy.screenShotWithoutPause("Camera", "ortho-switch");

  })

  it("Render Target", () => {
    cy.screenShotOnly("Camera", "render-target");
  })

  it("Renderer Cull", () => {
    cy.visit("/mpa/renderer-cull.html");
    cy.wait(1000);

    cy.get("#canvas")
      .should("exist")
      .trigger("pointerdown", {
        offsetX: 600,
        offsetY: 600,
        buttons: 1,
        button: 0,
        force: true,
      })
      .wait(20)
      .trigger("pointermove", {
        offsetX: 800,
        offsetY: 800,
        buttons: 1,

        button: 0,
        force: true,
      })
      .blur();

      cy.wait(1000);

      // ScreenShot
      const imageName = "Camera_renderer-cull";
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
        ({ match }) => match
      );
  })

  it("screenshot", () => {
    cy.visit("/mpa/screenshot.html");
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine._vSyncCount = Infinity;
      cy.get("#canvas").then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 100;
              cypressEnv.engine.update();
            }
            cy.contains("screenshot").click();
            const imageName = `Camera_screenshot`;
            resolve(
              recurse(
                () => {
                  return cy
                    .get("#canvas")
                    .then(() => {
                      return cy.task("compareScreenshot", {
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
  })
});
