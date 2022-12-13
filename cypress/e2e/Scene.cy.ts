import { recurse } from "cypress-recurse";

describe("Scene", () => {
  it("Scene Background", () => {
    cy.screenShotWithoutPause("Scene", "background");
  });

  it("HDR Background", () => {
    cy.screenShotWithoutPause("Scene", "hdr-loader", 0, 3000);
  });

  it("Video Background", () => {
    cy.screenShotOnly("Scene", "video-background", 4000, .85);
  })
});
