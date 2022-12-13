import { recurse } from "cypress-recurse";

describe("Toolkit", () => {
  it("Framebuffer Picker", () => {
    cy.visit(`/mpa/framebuffer-picker.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/f40ef8dd-4c94-41d4-8fac-c1d2301b6e47.glb"
    ).as("initialRequest");
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cy.wait("@initialRequest").then(() => {
        cy.get("#canvas").then(() => {
          return new Promise((resolve) => {
            cy.get("#canvas").trigger("pointerdown", {
              offsetX: 1448 / 2,
              offsetY: 770 / 2,
              button: 0,
              force: true,
            });
            cy.get("#canvas").blur();
            setTimeout(() => {
              for (let i = 0; i < 10; ++i) {
                cypressEnv.engine._time._deltaTime = 1000;
                cypressEnv.engine.update();
              }
              cy.wait(100);
              const imageName = `Toolkit_framebuffer-picker`;
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
  });

  it("Geometry Sketch", () => {
    cy.visit(`/mpa/geometry-sketch.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/09904c03-0d23-4834-aa73-64e11e2287b0.bin"
    ).as("initialRequest");
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cy.wait("@initialRequest", { timeout: 60000 }).then(() => {
        cy.get("#canvas")
          .trigger("pointerdown", {
            offsetX: 810 / 2,
            offsetY: 794 / 2,
            button: 0,
            force: true,
          })
          .then(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 200;
              cypressEnv.engine.update();
            }
            requestAnimationFrame(() => {
              cypressEnv.engine.pause();
            });
          })
          .blur();

        cy.get("#canvas").then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const imageName = `Toolkit_geometry-sketch`;
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
                            threshold: 0.3,
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
  });

  it("Gizmo", () => {
    // TODO 报错
    cy.on("uncaught:exception", () => {
      return false;
    });
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/OasisHub/34156c78-ed78-4792-a027-f6b790ac5bd1/oasis-file/1664436920180/medieval_fantasy_tavern.gltf"
    ).as("initialRequest");
    cy.visit("/mpa/gizmo.html");

    cy.wait("@initialRequest", { timeout: 60000 });
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
    const imageName = "Toolkit_gizmo";
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
  });

  //TODO error
  it("Infinity Grid", () => {
    cy.visit(`/mpa/infinity-grid.html`);
    cy.wait(3000);
    cy.get("#canvas").screenshot("Toolkit_infinity-grid", {
      overwrite: true,
    });
  });

  it("Lines", () => {
    cy.screenShotAndCompare("Toolkit", "lines");
  });

  it.only("Outline post-process", () => {
    cy.visit(`/mpa/outline-postprocess.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb"
    ).as("initialRequest");
    cy.window().then((win) => {
      cy.wait("@initialRequest").then(() => {
        //@ts-ignore
        const { cypressEnv } = win;
        cy.get("#canvas")
          .trigger("pointerdown", {
            offsetX: 1255 / 2,
            offsetY: 863 / 2,
            button: 0,
            force: true,
          })
          .then(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 200;
              cypressEnv.engine.update();
            }
            requestAnimationFrame(() => {
              cypressEnv.engine.pause();
            });
          })
          .blur();
        cy.get("#canvas").then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const imageName = `Toolkit_outline-postprocess`;
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
                            antialiasing: true,
                            threshold: 0.6,
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
  });

  it.only("Planar Shadow", () => {
    cy.visit(`/mpa/planar-shadow.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb"
    ).as("initialRequest");
    cy.window().then((win) => {
        //@ts-ignore
      const { cypressEnv } = win;
    
      requestAnimationFrame(() => {
        cypressEnv.engine.pause();
      });
      cy.wait("@initialRequest").then(() => {
        cy.get("#canvas").then(() => {
          for (let i = 0; i < 10; ++i) {
            cypressEnv.engine._time._deltaTime = 200;
            cypressEnv.engine.update();
          }
          return new Promise((resolve) => {
            setTimeout(() => {
              const imageName = `Toolkit_planar-shadow`;
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
                            // antialiasing: true,
                            // threshold: 0.6,
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
  });
});

//TODO error
it("Skeleton Viewer", () => {
  cy.visit(`/mpa/skeleton-viewer.html`);
  cy.wait(3000);
  cy.get("#canvas").screenshot("Toolkit_skeleton-viewer", {
    overwrite: true,
  });
});

