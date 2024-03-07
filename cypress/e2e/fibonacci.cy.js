import {
  fibonacciArr,
  inputField,
  submitButton,
  url,
  value,
} from "./constants";
import { DELAY_IN_MS } from "../../src/utils/constants/delays";
import { checkResult } from "./utils";

describe("Последовательность Фибоначчи", function () {
  beforeEach(function () {
    cy.visit(`${url}/fibonacci`);
    cy.contains("Последовательность Фибоначчи");
    cy.viewport("macbook-15");
  });

  it("если в input пусто, то кнопка добавления недоступна", function () {
    cy.get(inputField).clear();
    cy.get(submitButton).should("be.disabled");
  });

  it("числа генерируются корректно", function () {
    cy.get(inputField).type(String(value));
    cy.get(submitButton).click();
    cy.get(submitButton).should("be.disabled");
    cy.wait(DELAY_IN_MS * value);
    checkResult(fibonacciArr);
  });
});
