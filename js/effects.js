const EFFECTS = {
  none: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    units: ''
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%'
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px'
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    units: ''
  }
};

let currentEffect = EFFECTS.none;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectValueElement = document.querySelector('.effect-level__value');

const isDefaultEffect = () => currentEffect === EFFECTS.none;

const sliderShow = () => {
  sliderContainerElement.classList.remove('hidden');
};

const sliderHide = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: currentEffect.max,
    step: currentEffect.step,
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    }
  });

  if (isDefaultEffect()) {
    sliderHide();
  } else {
    sliderShow();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = EFFECTS[evt.target.value];
  imageElement.className = `effects__preview--${currentEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();

  imageElement.style.filter = isDefaultEffect()
    ? EFFECTS.none.style
    : `${currentEffect.style}(${sliderValue}${currentEffect.units})`;

  effectValueElement.value = sliderValue;
};

const resetEffects = () => {
  currentEffect = EFFECTS.none;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  start: EFFECTS.none.max,
  step: EFFECTS.none.step,
  connect: true,
  range: {
    min: EFFECTS.none.min,
    max: EFFECTS.none.max
  }
});

sliderHide();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
