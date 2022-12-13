describe("Texture", () => {
  it("Compressed Texture", () => {
    cy.screenShotWithoutPause("Texture", "compressed-texture");
  });

  it("Filter Mode", () => {
    cy.screenShotWithoutPause("Texture", "filter-mode");
  });

  it("Anisotropic", () => {
    cy.screenShotWithoutPause("Texture", "texture-aniso");
  });

  it("Mipmap", () => {
    cy.screenShotWithoutPause("Texture", "texture-mipmap");
  });

  it("Wrap Mode", () => {
    cy.screenShotWithoutPause("Texture", "wrap-mode");
  });
});
