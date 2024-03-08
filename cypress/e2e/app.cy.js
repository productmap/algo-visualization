import {url} from "./constants";

describe("Тестирование работоспособности приложения", function () {
  it("доступность по адресу localhost:3000", function () {
    cy.visit(url);
  });
});

describe("Тестирование переходов по страницам", function () {
  it("переход на страницу Строка", function () {
    cy.visit(`${url}/recursion`);
  });

  it("переход на страницу Последовательность Фибоначчи", function () {
    cy.visit(`${url}/fibonacci`);
  });

  it("переход на страницу Сортировка массива", function () {
    cy.visit(`${url}/sorting`);
  });

  it("переход на страницу Стек", function () {
    cy.visit(`${url}/stack`);
  });

  it("переход на страницу Очередь", function () {
    cy.visit(`${url}/queue`);
  });

  it("переход на страницу Связный список", function () {
    cy.visit(`${url}/list`);
  });
});
