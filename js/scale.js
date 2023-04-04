const scaleParameter = {
  STEP_SCALE: 25,
  MIN_SCALE_VALUE: 25,
  MAX_SCALE_VALUE: 100,
  DEFAULT_VALUE: 100
};

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

  let currentValue = value - scaleParameter.STEP_SCALE;

  if (currentValue < scaleParameter.MIN_SCALE_VALUE) {
    currentValue = scaleParameter.MIN_SCALE_VALUE;
  }

  scaleImage(currentValue);
};

const onButtonBiggerClick = () => {
  const value = parseInt(inputValueElement.value, 10);

  let currentValue = value + scaleParameter.STEP_SCALE;

  if (currentValue > scaleParameter.MAX_SCALE_VALUE) {
    currentValue = scaleParameter.MAX_SCALE_VALUE;
  }

  scaleImage(currentValue);
};

const resetScale = () => scaleImage(scaleParameter.DEFAULT_VALUE);

buttonSmallerElement.addEventListener('click', onButtonSmallerClick);
buttonBiggerElement.addEventListener('click', onButtonBiggerClick);

export { resetScale };
