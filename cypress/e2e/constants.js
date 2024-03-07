export const url = 'http://localhost:3000',
  resultSection = '[class*=result]',
  submitButton = 'button[type="submit"]', // кнопка отправки формы
  inputField = 'input[name="value"]', // поле ввода
  indexField = 'input[name="index"]', // поле индекса
  circle = '[class*="circle_circle"]', // class круга
  circleContent = '[class*="circle_content"]', // class круга
  circleHead = '[class*="circle_head"]', // class head круга
  circleTail = '[class*="circle_tail"]', // class head круга
  stateDefault = '[class*=circle_default]', // Стиль круга по умолчанию
  stateModified = '[class*=circle_modified]', // Стиль круга модифицированного
  stateChanging = '[class*=circle_changing]', // Стиль круга когда круг был изменен
  addButton = 'button[name="add"]', // кнопка добавления
  delButton = 'button[name="del"]', // кнопка удаления
  clearButton = 'button[name="clear"]', // кнопка очистки
  addToHeadButton = 'button[name="addToHead"]', // кнопка добавления кода в head
  addToTailButton = 'button[name="addToTail"]', // кнопка добавления кода в tail
  delFromHeadButton = 'button[name="delFromHead"]', // кнопка добавления кода в tail
  delFromTailButton = 'button[name="delFromTail"]', // кнопка добавления кода в tail
  addByIndexButton = 'button[name="addByIndex"]', // кнопка добавления кода в tail
  delByIndexButton = 'button[name="delByIndex"]', // кнопка добавления кода в tail
  value = "5", // значение для проверки
  index = "1", // индекс для проверки
  string = 'string', // строка для проверки
  fibonacciArr = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
    2584, 4181,
  ], // последовательность чисел Фибоначчи
  listDefault = [0, 34, 8, 1]; // дефолтный список
