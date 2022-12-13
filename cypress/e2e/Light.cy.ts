import { recurse } from "cypress-recurse";

describe("Light", () => {
  it("AmbientLight", () => {
    cy.screenShotAndCompare("Light", "ambient-light");
  });

  it("Cascaded Stable Shadow", () => {
    cy.screenShotAndCompare("Light", "cascade-shadow");
  });

  it("Light Type", () => {
    cy.screenShotAndCompare("Light", "light-type");
  });

  it("Shadow Basic", () => {
    cy.screenShotAndCompare("Light", "shadow-basic", 3000);
  });

  it("Transparent Shadow", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/93196534-bab3-4559-ae9f-bcb3e36a6419.glb"
    ).as("glb");
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
    ).as("bin");
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*X0IjQ5E1OUEAAAAAAAAAAAAAARQnAQ"
    ).as("texture");
    cy.visit("/mpa/transparent-shadow.html");
    cy.window().then((win) => {
      //@ts-ignore
      const { cypressEnv } = win;
      cypressEnv.engine._vSyncCount = Infinity;
      cy.wait("@glb")
        .wait("@bin")
        .wait("@texture")
        .then(() => {
          cy.get("#canvas").then(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                for (let i = 0; i < 10; ++i) {
                  cypressEnv.engine._time._deltaTime = 1000;
                  cypressEnv.engine.update();
                }
                const imageName = `Light_transparent-shadow`;
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
