import { recurse } from "cypress-recurse";

describe("Scene", () => {
  it("Scene Background", () => {
    cy.screenShotAndCompare("Scene", "background");
  });

  it("HDR Background", () => {
    cy.screenShotAndCompare("Scene", "hdr-loader", 3000);
  });

  it("Video Background", () => {
    cy.screenShotOnly("Scene", "video-background", 4000, .85);
  })
});
