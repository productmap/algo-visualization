import {
  addButton,
  circle,
  clearButton,
  delButton,
  inputField,
  resultSection,
  stateModified,
  url,
  value,
} from "./constants";
import {
  DELAY_IN_MS,
  SHORT_DELAY_IN_MS,
} from "../../src/utils/constants/delays";
import { checkResult } from "./utils";

describe("Стек", function () {
  beforeEach(function () {
    cy.visit(`${url}/stack`);
    cy.contains("Стек");
    cy.viewport("macbook-15");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get(inputField).clear();
    cy.get(addButton).should("be.disabled");
    cy.get(delButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");
  });

  it("добавления элемента в стек", function () {
    // Добавление элемента
    cy.get(inputField).type(value);
    cy.get(addButton).click();
    // Проверка смены стиля
    cy.get(circle).then((circles) => {
      expect(circles[0]).to.match(stateModified);
    });
    cy.wait(DELAY_IN_MS);
    // Проверка добавления элемента в стек
    checkResult([...value]);
  });

  it("удаление элемента в стек", function () {
    // Добавление элемента
    cy.get(inputField).type(value);
    cy.get(addButton).click();
    cy.wait(DELAY_IN_MS);
    // Удаление элемента
    cy.get(delButton).click();
    cy.wait(SHORT_DELAY_IN_MS);
    // Проверка удаления элемента из стека
    cy.get(resultSection).should("be.empty");
  });

  it("поведение кнопки «Очистить»", function () {
    cy.get(inputField).type(value);
    cy.get(addButton).click();
    cy.get(clearButton).click();
    // Проверка очистки стека
    cy.get(resultSection).should("be.empty");
  });
});