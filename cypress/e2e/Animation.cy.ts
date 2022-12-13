import { recurse } from "cypress-recurse";

describe("Animation", () => {
  it("Animation CustomAnimationClip", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/OasisHub/315000159/9722/Sponza.bin"
    ).as("initialRequest");
    cy.visit(`/mpa/animation-customAnimationClip.html`);
    cy.window().then((win) => {
      win.Math.random = () => 0.5;
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine._vSyncCount = Infinity;
      cy.wait("@initialRequest", { timeout: 60000 }).then(() => {
        cy.get("#canvas").then(() => {
          return new Promise((resolve) => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 100;
              cypressEnv.engine.update();
            }
            cy.wait(12000);
            const imageName = `Animation_animation-customAnimationClip`;
            resolve(
              recurse(
                () => {
                  cypressEnv.engine._time._deltaTime = 0;
                  cypressEnv.engine.update();
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
          });
        });
      });
    });
  });

  it("Animation Event", () => {
    cy.screenShotAfterRequest(
      "Animation",
      "animation-event",
      "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb",
      100
    );
  });

  it("AnimatorStateScript", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb"
    ).as("initialRequest");
    cy.visit(`/mpa/animation-stateMachineScript.html`);
    cy.window().then((win) => {
      win.Math.random = () => 0.5;
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine._vSyncCount = Infinity;
      cy.wait("@initialRequest", { timeout: 60000 }).then(() => {
        cy.get("select").eq(0).select("run").blur();
        cy.get("#canvas").then(() => {
          return new Promise((resolve) => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 100;
              cypressEnv.engine.update();
            }
            const imageName = `Animation_animation-stateMachineScript`;
            resolve(
              recurse(
                () => {
                  cypressEnv.engine._time._deltaTime = 0;
                  cypressEnv.engine.update();
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
          });
        });
      });
    });
  });

  it("Animation Additive", () => {
    cy.screenShotAfterRequest(
      "Animation",
      "skeleton-animation-additive",
      "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb",
      100
    );
  });

  it("Animation BlendShape", () => {
    cy.screenShotAfterRequest(
      "Animation",
      "skeleton-animation-blendShape",
      "https://gw.alipayobjects.com/os/bmw-prod/746da3e3-fdc9-4155-8fee-0e2a97de4e72.glb",
      100
    );
  });

  it("Animation CrossFade", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb"
    ).as("initialRequest");
    cy.visit(`/mpa/skeleton-animation-crossfade.html`);
    cy.window().then((win) => {
      win.Math.random = () => 0.5;
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine._vSyncCount = Infinity;
      cy.wait("@initialRequest", { timeout: 60000 }).then(() => {
        cy.get("select").eq(0).select("run").blur();
        cy.get("#canvas").then(() => {
          return new Promise((resolve) => {
            for (let i = 0; i < 10; ++i) {
              cypressEnv.engine._time._deltaTime = 20;
              cypressEnv.engine.update();
            }
            const imageName = `Animation_skeleton-animation-crossfade`;
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
          });
        });
      });
    });
  });

  it("Animation CustomBlendShape", () => {
    cy.visit(`/mpa/skeleton-animation-customBlendShape.html`);
    cy.window().then((win) => {
      win.Math.random = () => 0.5;
      cy.get(".slider").eq(0).slide(20);
      cy.get("#canvas").then(() => {
        return new Promise((resolve) => {
          const imageName = `Animation_skeleton-animation-customBlendShape`;
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
        });
      });
    });
  });

  it("Animation Play", () => {
    cy.screenShotAfterRequest(
      "Animation",
      "skeleton-animation-play",
      "https://gw.alipayobjects.com/os/bmw-prod/5e3c1e4e-496e-45f8-8e05-f89f2bd5e4a4.glb",
      100
    );
  });

  it("Animation Reuse", () => {
    cy.screenShotAfterRequest(
      "Animation",
      "skeleton-animation-reuse",
      "https://gw.alipayobjects.com/os/OasisHub/9ef53086-67d4-4be6-bff8-449a8074a5bd/data.gltf",
      100
    );
  });
});
