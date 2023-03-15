import { recurse } from "cypress-recurse";

describe("2D", () => {
  it("CSS DOM", () => {
    cy.visit("/mpa/CSS-DOM.html");
    cy.wait(1000);
    cy.get("#canvas")
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
      })
      .blur();

    cy.wait(3000);
    // ScreenShot
    const imageName = "2D_CSS-DOM";
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
    cy.get("#canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine._vSyncCount = Infinity;
        cy.get("#canvas")
          .trigger("pointerdown", {
            offsetX: 600,
            offsetY: 600,
            buttons: 1,
            force: true,
          })
          .blur()
          .then(() => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 20;
              cypressEnv.engine.update();
            }
          });
        return new Promise((resolve) => {
          setTimeout(() => {
            const imageName = "2D_flappy-bird";
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
    cy.screenShotOnly("2D", "lottie-3d-rotation");
  });

  it("Lottie Clips", () => {
    cy.visit("/mpa/lottie-clips.html");
    cy.get("#canvas").then(() => {
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
          });
        }, 1000);

        return new Promise((resolve) => {
          setTimeout(() => {
            const imageName = "2D_lottie-clip";
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

  it("Lottie Animation", () => {
    cy.screenShotOnly("2D", "lottie");
  });

  it("Spine Animation", () => {
    cy.screenShotOnly("2D", "spine-animation");
  });

  it("Spine Change Attachment", () => {
    cy.visit("/mpa/spine-change-attachment.html");
    cy.get("#canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine.pause();
        cy.get("select").eq(0).select("fullskin/snowman");
        cy.get("select").eq(0).blur();

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
          const imageName = "2D_spine-change-attachment";
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

  it("Spine Hack Slot Texture", () => {
    cy.visit("/mpa/spine-hack-slot-texture.html");
    cy.get("#canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine.pause();
        cy.get("select").eq(0).select("hair_14");
        cy.get("select").eq(1).select("clothes_14");
        cy.get("select").eq(2).select("weapon_14");
        cy.get("select").eq(2).blur();
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
          const imageName = "2D_spine-hack-slot-texture";
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

  it("Spine Change Skin", () => {
    cy.visit("/mpa/spine-skin-change.html");
    cy.get("#canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine.pause();
        cy.get("select").eq(0).select("boy");
        cy.get("select").eq(0).blur();
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
          const imageName = "2D_spine-skin-change";
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

  it("Sprite Atlas", () => {
    cy.screenShotOnly("2D", "sprite-atlas");
  });

  it("Sprite Color", () => {
    cy.screenShotOnly("2D", "sprite-color");
  });

  it("Sprite Flip", () => {
    cy.screenShotOnly("2D", "sprite-flip");
  });

  it("Sprite Mask", () => {
    cy.screenShotOnly("2D", "sprite-mask");
  });

  it("Sprite Material Blur", () => {
    cy.screenShotOnly("2D", "sprite-material-blur");
  });

  it("Sprite Material Blur", () => {
    cy.screenShotOnly("2D", "sprite-material-dissolve");
  });

  it("Sprite Material Glitch", () => {
    cy.screenShotOnly("2D", "sprite-material-glitch-rgbSplit");
  });

  it("Sprite Pivot", () => {
    cy.visit("/mpa/sprite-pivot.html");
    cy.get("#canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine.pause();
        cy.get(".slider").eq(0).slide(20);
        cy.get(".slider").eq(1).slide(-20);

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
          const imageName = "2D_sprite-pivot";
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

  it("Sprite Region", () => {
    cy.screenShotOnly("2D", "sprite-region");
  });

  it("Sprite Renderer", () => {
    cy.screenShotOnly("2D", "sprite-renderer");
  });

  it("Sprite SheetAnimation", () => {
    cy.screenShotOnly("2D", "sprite-sheetAnimation", 100, 0.69);
  });

  it("Sprite Slice", () => {
    cy.visit("/mpa/sprite-slice.html");
    cy.get("#canvas").then(() => {
      return cy.window().then((win) => {
        //@ts-ignore
        const { cypressEnv } = win;
        cypressEnv.engine._vSyncCount = Infinity;
        cy.get("input[type=checkbox]").eq(0).check();
        cy.get(".slider").eq(0).slide(20);
        cy.get(".slider").eq(1).slide(-20);
        cy.get(".slider").eq(2).slide(-50);
        cy.get(".slider").eq(3).slide(20);
        cy.get(".slider").eq(4).slide(20);
        cy.get(".slider").eq(5).slide(20);

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
          const imageName = "2D_sprite-slice";
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

  it("Text KTV Subtitle", () => {
    cy.screenShotOnly("2D", "text-ktv-subtitle");
  });

  it("Text Renderer Font", () => {
    cy.screenShotOnly("2D", "text-renderer-font");
  });

  it("Text Renderer", () => {
    cy.screenShotOnly("2D", "text-renderer");
  });

  it("Text Wrap And Alignment", () => {
    cy.screenShotOnly("2D", "text-wrap-alignment");
  });
});
