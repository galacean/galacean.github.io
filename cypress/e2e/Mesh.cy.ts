describe("Mesh", () => {
  it("Buffer Mesh Independent", () => {
    cy.screenShotOnly("Mesh", "buffer-mesh-independent");
  });

  //TODO need opt
  it("Buffer Mesh Instance", () => {
    cy.visit(`/mpa/buffer-mesh-instance.html`);
    cy.wait(3000);
    cy.get("#canvas").screenshot("Mesh_buffer-mesh-instance", {
      overwrite: true,
    });
  });

  it("Buffer Mesh Interleaved", () => {
    cy.screenShotWithoutPause("Mesh", "buffer-mesh-interleaved");
  });

  it("Model Mesh", () => {
    cy.screenShotOnly("Mesh", "model-mesh");
  });

  it("OBJ Loader Use Model Mesh", () => {
    cy.screenShotOnly("Mesh", "obj-loader");
  });

  it("Primitive Mesh", () => {
    cy.screenShotOnly("Mesh", "primitive-mesh");
  })
});

