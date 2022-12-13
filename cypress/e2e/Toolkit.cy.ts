import { recurse } from "cypress-recurse";

describe("Toolkit", () => {
  it("Framebuffer Picker", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/f40ef8dd-4c94-41d4-8fac-c1d2301b6e47.glb"
    ).as("initialRequest");
    cy.visit(`/mpa/framebuffer-picker.html`);
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cy.wait("@initialRequest").then(() => {
        cy.wait(1000);
        cy.get("#canvas")
          .trigger("pointerdown", {
            offsetX: 1448 / 2,
            offsetY: 770 / 2,
            button: 0,
            force: true,
          })
          .blur()
          .then(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                for (let i = 0; i < 10; ++i) {
                  cypressEnv.engine._time._deltaTime = 1000;
                  cypressEnv.engine.update();
                }
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
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/09904c03-0d23-4834-aa73-64e11e2287b0.bin"
    ).as("initialRequest");
    cy.visit(`/mpa/geometry-sketch.html`);
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine._vSyncCount = Infinity;
      cy.wait("@initialRequest", { timeout: 60000 }).then(() => {
        cy.wait(1000);
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
          })
          .blur()
          .then(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                for (let i = 0; i < 10; ++i) {
                  cypressEnv.engine._time._deltaTime = 200;
                  cypressEnv.engine.update();
                }
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

  //TODO error
  it("Gizmo", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/OasisHub/34156c78-ed78-4792-a027-f6b790ac5bd1/oasis-file/1664436920180/medieval_fantasy_tavern.gltf"
    ).as("initialRequest");
    cy.visit("/mpa/gizmo.html");
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine._vSyncCount = Infinity;
      cy.wait("@initialRequest", { timeout: 60000 }).then(() => {
        cy.wait(1000);
        cy.get("#canvas")
          .trigger("pointerdown", {
            offsetX: 600,
            offsetY: 600,
            buttons: 1,
            button: 0,
            force: true,
          }).then(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 200;
              cypressEnv.engine.update();
            }
          })
          .wait(20)
          .trigger("pointermove", {
            offsetX: 300,
            offsetY: 300,
            buttons: 1,
            button: 0,
            force: true,
          }).then(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 200;
              cypressEnv.engine.update();
            }
          })
          .blur()
          .then(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                for (let i = 0; i < 10; ++i) {
                  cypressEnv.engine._time._deltaTime = 200;
                  cypressEnv.engine.update();
                }
                const imageName = `Toolkit_gizmo`;
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
  });

  it("Infinity Grid", () => {
    cy.screenShotWithoutPause("Toolkit", "infinity-grid");

  });

  it("Lines", () => {
    cy.screenShotWithoutPause("Toolkit", "lines");
  });

  it("Outline post-process", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb"
    ).as("initialRequest");
    cy.visit(`/mpa/outline-postprocess.html`);
    cy.window().then((win) => {
      cy.wait("@initialRequest", { timeout: 60000 }).then(() => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine._vSyncCount = Infinity;
        cy.wait(1000);
        cy.get("#canvas")
          .trigger("pointerdown", {
            offsetX: 1260 / 2,
            offsetY: 809 / 2,
            button: 0,
            force: true,
          })
          .then(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 100;
              cypressEnv.engine.update();
            }
          })
          .blur();
        cy.get("#canvas").then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              for (let i = 0; i < 10; ++i) {
                cypressEnv.engine._time._deltaTime = 100;
                cypressEnv.engine.update();
              }
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

  it("Planar Shadow", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb"
    ).as("initialRequest");
    cy.visit(`/mpa/planar-shadow.html`);
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine._vSyncCount = Infinity;
      cy.wait("@initialRequest").then(() => {
        cy.get("#canvas").then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              for (let i = 0; i < 10; ++i) {
                cypressEnv.engine._time._deltaTime = 200;
                cypressEnv.engine.update();
              }
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

  it("Skeleton Viewer", () => {
    cy.screenShotAfterRequest(
      "Toolkit",
      "skeleton-viewer",
      "https://gw.alipayobjects.com/os/bmw-prod/f40ef8dd-4c94-41d4-8fac-c1d2301b6e47.glb"
    );
  });
});
