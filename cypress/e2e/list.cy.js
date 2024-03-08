import {
  addByIndexButton,
  addToHeadButton,
  addToTailButton,
  delByIndexButton,
  delFromHeadButton, delFromTailButton,
  index,
  indexField,
  inputField,
  listDefault,
  url,
  value,
} from "./constants";
import { DELAY_IN_MS } from "../../src/utils/constants/delays";
import { checkResult } from "./utils";

describe("Связный список", function () {
  beforeEach(function () {
    cy.visit(`${url}/list`);
    cy.contains("Связный список");
    cy.viewport("macbook-15");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже", function () {
    cy.get(inputField).clear();
    cy.get(addToHeadButton).should("be.disabled");
    cy.get(addToTailButton).should("be.disabled");
    cy.get(addByIndexButton).should("be.disabled");
    cy.get(delByIndexButton).should("be.disabled");
  });

  it("отрисовки дефолтного списка", function () {
    checkResult(listDefault); // проверка на дефолтный список
  });

  it("добавления элемента в head", function () {
    cy.get(inputField).type(value);
    cy.get(addToHeadButton).click();
    // Итоговый список
    const result = [value, ...listDefault];
    // Проверка
    cy.wait(DELAY_IN_MS);
    checkResult(result);
  });

  it("добавления элемента в tail", function () {
    cy.get(inputField).type(value);
    cy.get(addToTailButton).click();
    // Итоговый список
    const result = [...listDefault, value];
    // Проверка
    cy.wait(DELAY_IN_MS);
    checkResult(result);
  });

  it("удаления элемента из head", function () {
    cy.get(delFromHeadButton).click();
    // Итоговый список
    const result = listDefault.slice(1);
    // Проверка
    cy.wait(DELAY_IN_MS);
    checkResult(result);
  });

  it("удаления элемента из tail", function () {
    cy.get(delFromTailButton).click();
    // Итоговый список
    const result = listDefault.slice(0, -1);
    // Проверка
    cy.wait(DELAY_IN_MS);
    checkResult(result);
  });

  it("добавления элемента по индексу", function () {
    cy.get(inputField).type(value);
    cy.get(indexField).type("{selectall}{backspace}");
    cy.get(indexField).type(index);
    cy.get(addByIndexButton).click();
    // Итоговый список
    const result = [
      ...listDefault.slice(0, Number(index)),
      value,
      ...listDefault.slice(Number(index)),
    ];
    // Проверка наличия элемента в списке
    cy.wait(DELAY_IN_MS);
    checkResult(result);
  });

  it("удаления элемента по индексу", function () {
    cy.get(inputField).type(value);
    cy.get(indexField).type("{selectall}{backspace}");
    cy.get(indexField).type(index);
    cy.get(delByIndexButton).click();
    // Итоговый список
    let result = listDefault.filter((_, i) => i !== Number(index));
    cy.wait(DELAY_IN_MS * 2);
    checkResult(result);
  });
});