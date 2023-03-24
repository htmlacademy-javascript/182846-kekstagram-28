const STEP_SCALE = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_VALUE = 100;

const buttonSmallerElement = document.querySelector('.scale__control--smaller');
const buttonBiggerElement = document.querySelector('.scale__control--bigger');
const inputValueElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  inputValueElement.value = `${value}%`;
};

const onButtonSmallerClick = () => {
  const value = parseInt(inputValueElement.value, 10);

  let currentValue = value - STEP_SCALE;

  if (currentValue < MIN_SCALE_VALUE) {
    currentValue = MIN_SCALE_VALUE;
  }

  scaleImage(currentValue);
};

const onButtonBiggerClick = () => {
  const value = parseInt(inputValueElement.value, 10);

  let currentValue = value + STEP_SCALE;

  if (currentValue > MAX_SCALE_VALUE) {
    currentValue = MAX_SCALE_VALUE;
  }

  scaleImage(currentValue);
};

const resetScale = () => scaleImage(DEFAULT_VALUE);

buttonSmallerElement.addEventListener('click', onButtonSmallerClick);
buttonBiggerElement.addEventListener('click', onButtonBiggerClick);

export { resetScale };
