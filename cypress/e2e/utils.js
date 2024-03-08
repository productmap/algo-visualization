import {circle} from "./constants";

export function checkResult(result) {
  cy.get(circle).then((circles) => {
    cy.wrap(circles).each((num, index) => {
      cy.wrap(num).should("have.text", result[index]);
    });
  });
}
