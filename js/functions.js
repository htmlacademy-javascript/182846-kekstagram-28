// Функция для проверки длины строки.
const checkLengthString = (string, length) => string.length <= length;

checkLengthString('проверяемая строка', 20);

// Функция для проверки, является ли строка палиндромом.
const checkPalindrome = (string) => {
  let newString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    newString += string.at(i);
  }

  return string.toLowerCase().replaceAll(' ', '') === newString.toLowerCase().replaceAll(' ', '');
};

checkPalindrome('топот');

// Функция, которая из строки возвращает число.
const convertNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }

  return parseInt(result, 10);
};

convertNumber('агент 007');

// Функция с добавочными символами
const complementsString = (string, minLength, pad) => {
  const actualPad = minLength - string.length;

  if (actualPad <= 0) {
    return string;
  }

  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};

complementsString('qwerty', 4, '0');
