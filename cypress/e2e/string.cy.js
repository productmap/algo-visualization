import {
  circle,
  inputField,
  stateDefault,
  stateModified,
  string,
  submitButton,
  url,
} from "./constants";
import { DELAY_IN_MS } from "../../src/utils/constants/delays";

describe("Строка", function () {
  beforeEach(function () {
    cy.visit(`${url}/recursion`);
    cy.contains("Строка");
    cy.viewport("macbook-15");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get(inputField).clear();
    cy.get(submitButton).should("be.disabled");
  });

  it("строка разворачивается корректно", function () {
    cy.get(inputField).type(string);
    cy.get(submitButton).click();
    cy.get(submitButton).should("be.disabled");
    cy.get(inputField).should("have.value", "");

    cy.get(circle).then((circles) => {
      expect(circles).to.have.length(string.length);
      cy.wrap(circles).each((circle) => {
        cy.wrap(circle).get(stateDefault);
      });
      cy.wrap(circles).each((circle, index) => {
        cy.wait(DELAY_IN_MS);
        cy.wrap(circle)
          .get(stateModified)
          .contains(string.charAt(string.length - (index + 1)));
      });
    });
  });
});