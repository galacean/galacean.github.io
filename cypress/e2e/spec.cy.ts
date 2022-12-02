import { recurse } from "cypress-recurse";

describe("2D", () => {
  it("CSS DOM", () => {
    cy.visit("/mpa/CSS-DOM.html");
    const canvas = cy.get("canvas");
    canvas.should("exist");
    cy.get("canvas")
      .trigger("pointerdown", {
        offsetX: 600,
        offsetY: 600,
        buttons: 2,
        force: true,
      })
      .wait(20)
      .trigger("pointermove", {
        offsetX: 300,
        offsetY: 300,
        buttons: 2,
        force: true,
      })
      .wait(20)
      .trigger("pointerup", {
        offsetX: 300,
        offsetY: 300,
        buttons: 2,
        force: true,
      })
      .wait(20)
      .trigger("pointerdown", {
        offsetX: 600,
        offsetY: 600,
        buttons: 1,
        force: true,
      })
      .wait(20)
      .trigger("pointermove", {
        offsetX: 300,
        offsetY: 300,
        buttons: 1,
        force: true,
      })
      .wait(20)
      .trigger("pointerup", {
        offsetX: 300,
        offsetY: 300,
        buttons: 1,
        force: true,
      });

    cy.wait(1000);
    // ScreenShot
    const imageName = "2D_CSSDOM";
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

  it("FlappyBird", () => {
    cy.visit("/mpa/flappy-bird.html");
    cy.get("canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine.pause();
        cy.get("canvas")
          .trigger("pointerdown", {
            offsetX: 600,
            offsetY: 600,
            buttons: 1,
            force: true,
          })
          .then(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 20;
              cypressEnv.engine.update();
            }
          });
        return new Promise((resolve) => {
          setTimeout(() => {
            const imageName = "2D_FLAPPYBIRD";
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
                          threshold: 0.69,
                        },
                      });
                    });
                },
                ({ match }) => match
              )
            );
          }, 1000);
        });
      });
    });
  });

  it("Lottie 3D Rotation", () => {
    cy.visit("/mpa/lottie-3d-rotation.html");
    cy.get("canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine.pause();
        return new Promise((resolve) => {
          setTimeout(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 100;
              cypressEnv.engine.update();
            }
            const imageName = "2D_Lottie3DRotation";
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
          }, 1000);
        });
      });
    });
  });

  it("Lottie Clips", () => {
    cy.visit("/mpa/lottie-clips.html");
    cy.get("canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;

        setTimeout(() => {
          cypressEnv.engine.pause();
          for (let i = 0; i < 10; ++i) {
            cypressEnv.engine._time._deltaTime = 1000;
            cypressEnv.engine.update();
          }
          cypressEnv.engine.resume();
          setTimeout(() => {
            cypressEnv.engine.pause();
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 1000;
              cypressEnv.engine.update();
            }
          }, 0);
        }, 1000);

        return new Promise((resolve) => {
          setTimeout(() => {
            const imageName = "2D_LottieClips";
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
          }, 2000);
        });
      });
    });
  });

  it("LottieAnimation", () => {
    cy.visit("/mpa/lottie.html");
    cy.get("canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine.pause();
        return new Promise((resolve) => {
          setTimeout(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 1000;
              cypressEnv.engine.update();
            }
            const imageName = "2D_LottieAnimation";
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
          }, 1000);
        });
      });
    });
  });

  it("Spine Animation", () => {
    cy.visit("/mpa/spine-animation.html");
    cy.get("canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine.pause();
        return new Promise((resolve) => {
          setTimeout(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 100;
              cypressEnv.engine.update();
            }
            const imageName = "2D_SpineAnimation";
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
          }, 1000);
        });
      });
    });
  });

  it.only("Spine Hack Slot Texture", () => {
    cy.visit("/mpa/spine-hack-slot-texture.html");
    cy.get("canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine.pause();
        cy.get("select").eq(0).select("hair_14");
        cy.get("select").eq(1).select("clothes_14");
        cy.get("select").eq(2).select("weapon_14");

        setTimeout(() => {
          for (let i = 0; i < 10; ++i) {
            cypressEnv.engine._time._deltaTime = 1000;
            cypressEnv.engine.update();
          }
        }, 1000);

        return new Promise((resolve) => {
          for (let i = 0; i < 10; ++i) {
            cypressEnv.engine._time._deltaTime = 100;
            cypressEnv.engine.update();
          }
          cy.wait(1000);
          const imageName = "2D_SpineHackSlotTexture";
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
    });
  });
});
