describe("Material", () => {
  it("Blend Mode", () => {
    cy.screenShotAndCompare("Material", "blend-mode");
  });

  it("Blinn Phong Material", () => {
    cy.screenShotAndCompare("Material", "blinn-phong");
  });

  it("IBL Baker", () => {
    cy.screenShotAndCompare("Material", "ibl-baker");
  });

  it("PBR Base", () => {
    cy.screenShotAndCompare("Material", "pbr-base");
  });

  it("PBR Clearcoat", () => {
    cy.screenShotAndCompare("Material", "pbr-clearcoat");
  });

  it("PBR Helmet", () => {
    cy.screenShotAndCompare("Material", "pbr-helmet");
  });

  it("Shader Water", () => {
    cy.screenShotOnly("Material", "shader-water", 100, 0.75);
  });

  it("Tiling Offset", () => {
    cy.screenShotOnly("Material", "tiling-offset", 100);
  });

  it("Unlit Material", () => {
    cy.screenShotAfterRequest(
      "Material",
      "unlit-material",
      "https://gw.alipayobjects.com/os/bmw-prod/8d36415b-5905-461f-9336-68a23d41518e.gltf"
    );
  });
});
