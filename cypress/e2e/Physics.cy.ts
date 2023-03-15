import { recurse } from "cypress-recurse";

describe("Physics", () => {
  it("Lite Collision Detection", () => {
    cy.screenShotAfterRequest(
      "Physics",
      "lite-collision-detection",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin",
      160
    );
  });

  it("Lite Raycast", () => {
    cy.visit(`/mpa/lite-raycast.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
    ).as("initialRequest");
    cy.window().then((win) => {
      win.Math.random = () => 0.5;
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine._vSyncCount = Infinity;
      cy.wait("@initialRequest").then(() => {
        for (let i = 0; i < 10; ++i) {
          cypressEnv.engine._time._deltaTime = 1000;
          cypressEnv.engine.update();
        }
        cy.get("#canvas")
          .trigger("pointerdown", {
            offsetX: 1458 / 2,
            offsetY: 840 / 2,
            button: 0,
            force: true,
          })
          .then(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 1000;
              cypressEnv.engine.update();
            }
          })
          .blur()
          .then(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                const imageName = `Physics_lite-raycast`;
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

  it("Physic Debug Draw", () => {
    cy.screenShotPauseAfterRequest(
      "Physics",
      "physics-debug-draw",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin",
      160
    );
  });

  it("PhysX Attractor", () => {
    cy.screenShotPauseAfterRequest(
      "Physics",
      "physx-attractor",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin",
      100
    );
  });

  it("PhysX Collision Detection", () => {
    cy.screenShotPauseAfterRequest(
      "Physics",
      "physx-collision-detection",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin",
      160
    );
  });

  it("PhysX Compound", () => {
    cy.screenShotPauseAfterRequest(
      "Physics",
      "physx-compound",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin",
      1000
    );
  });

  it("PhysX Character Controller", () => {
    cy.visit(`/mpa/physx-controller.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/OasisHub/440001585/3380/Anim_Idle.gltf"
    ).as("initialRequest");
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/09904c03-0d23-4834-aa73-64e11e2287b0.bin"
    ).as("otherAsset");
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/OasisHub/440001585/7205/Anim_Run.gltf"
    ).as("runAction");
    cy.window().then((win) => {
      win.Math.random = () => 0.5;
      cy.wait("@initialRequest", { timeout: 60000 }).then(() => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine._vSyncCount = Infinity;
        cy.wait("@otherAsset")
          .wait("@runAction")
          .then(() => {
            cy.get("#canvas").trigger("keydown", { code: "KeyW" });
            cy.get("#canvas").then(() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  for (let i = 0; i < 10; ++i) {
                    cypressEnv.engine._time._deltaTime = 200;
                    cypressEnv.engine.update();
                  }
                  const imageName = `Physics_physx-controller`;
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
  });

  it("PhysX Joint Basic", () => {
    cy.visit(`/mpa/physx-joint-basic.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
    ).as("initialRequest");
    cy.window().then((win) => {
      win.Math.random = () => 0.5;
      cy.wait("@initialRequest").then(() => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine._vSyncCount = Infinity;
        cy.get("#canvas").trigger("pointerdown", {
          offsetX: 714,
          offsetY: 406,
          button: 0,
          force: true,
        });
        cy.get("#canvas").blur();
        cy.get("#canvas").then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              for (let i = 0; i < 10; ++i) {
                cypressEnv.engine._time._deltaTime = 1000;
                cypressEnv.engine.update();
              }
              const imageName = `PhysX_physx-joint-basic`;

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

  it("PhysX Raycast", () => {
    cy.visit(`/mpa/physx-raycast.html`);
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
    ).as("initialRequest");
    cy.window().then((win) => {
      win.Math.random = () => 0.5;
      cy.wait("@initialRequest").then(() => {
        win.Math.random = () => 0.1;
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine._vSyncCount = Infinity;
        for (let i = 0; i < 10; ++i) {
          cypressEnv.engine._time._deltaTime = 1000;
          cypressEnv.engine.update();
        }
        cy.get("#canvas")
          .trigger("pointerdown", {
            offsetX: 752.43359375,
            offsetY: 514,
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
                const imageName = `PhysX_physx-raycast`;
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

  it("PhysX Select", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
    ).as("initialRequest");
    cy.visit(`/mpa/physx-select.html`);

    cy.window().then((win) => {
      win.Math.random = () => 0.5;
      cy.wait("@initialRequest").then(() => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine._vSyncCount = Infinity;
        cy.get("#canvas")
          .trigger("pointerdown", {
            offsetX: 1307 / 2,
            offsetY: 747 / 2,
            button: 0,
            force: true,
          })
          .then(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 100;
              cypressEnv.engine.update();
            }
          })
          .trigger("pointermove", {
            offsetX: 0,
            offsetY: 747 / 2,
            button: 0,
            force: true,
          })
          .blur()
          .then(() => {
            return new Promise((resolve) => {
              for (let i = 0; i < 10; ++i) {
                cypressEnv.engine._time._deltaTime = 100;
                cypressEnv.engine.update();
              }
              setTimeout(() => {
                const imageName = `PhysX_physx-select`;
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
});
