import { recurse } from "cypress-recurse";

describe("Advance", () => {
  it("Outline multi-pass", () => {
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/bmw-prod/89c54544-1184-45a1-b0f5-c0b17e5c3e68.bin"
    ).as("binAsset");
    cy.intercept(
      "GET",
      "https://gw.alipayobjects.com/os/OasisHub/440000554/3615/%25E5%25BD%2592%25E6%25A1%25A3.gltf"
    ).as("gltfAsset");
    cy.visit(`/mpa/outline-multi-pass.html`);
    
    cy.wait("@binAsset", { timeout: 60000 }).wait("@gltfAsset", { timeout: 60000 });
    cy.wait(3000)
    cy.get("#canvas").then(() => {
      return new Promise((resolve) => {
          const imageName = `Advance_outline-multi-pass`;
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
