import { DELAY_IN_MS } from "../../src/utils/constants/delays";
import {
  addButton,
  circle,
  circleContent,
  circleHead,
  circleTail,
  clearButton,
  delButton,
  inputField,
  url,
  value,
} from "./constants";

describe("Очередь", function () {
  beforeEach(function () {
    cy.visit(`${url}/queue`);
    cy.contains("Очередь");
    cy.viewport("macbook-15");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get(inputField).clear();
    cy.get(addButton).should("be.disabled");
  });

  it("добавления элемента в очередь", function () {
    // Добавление элемента
    cy.get(inputField).type(value);
    cy.get(addButton).click();
    cy.wait(DELAY_IN_MS);
    // Проверка добавления элемента в очередь
    cy.get(circleContent).then((arr) => {
      cy.wrap(arr[0]).children(circle).should("have.text", value);
      cy.wrap(arr[0]).children(circleHead).should("have.text", "head");
      cy.wrap(arr[1]).children(circleTail).should("have.text", "tail");
    });
  });

  it("удаление элемента из очереди", function () {
    // Добавление элемента
    cy.get(inputField).type(value);
    cy.get(addButton).click();
    cy.wait(DELAY_IN_MS);
    // Удаление элемента
    cy.get(delButton).click();
    cy.wait(DELAY_IN_MS);
    // Проверка удаления элемента из очереди
    cy.get(circleContent).then((arr) => {
      cy.wrap(arr[0]).children(circle).should("have.text", "");
    });
  });

  it("поведение кнопки «Очистить»", function () {
    cy.get(inputField).type(value);
    cy.get(addButton).click();
    cy.get(clearButton).click();
    // Проверка очистки очереди
    cy.get(circle).then((circles) => {
      cy.wrap(circles).each((num) => {
        cy.wrap(num).should("have.text", "");
      });
    });
    cy.get(clearButton).should("be.disabled");
  });
});