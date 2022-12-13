describe("Texture", () => {
  it("Compressed Texture", () => {
    cy.screenShotAndCompare("Texture", "compressed-texture");
  });

  it("Filter Mode", () => {
    cy.screenShotAndCompare("Texture", "filter-mode");
  });

  it("Anisotropic", () => {
    cy.screenShotAndCompare("Texture", "texture-aniso");
  });

  it("Mipmap", () => {
    cy.screenShotAndCompare("Texture", "texture-mipmap");
  });

  it("Wrap Mode", () => {
    cy.screenShotAndCompare("Texture", "wrap-mode");
  });
});
