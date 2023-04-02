import { isEscapeKey } from './utils.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import './scale.js';
import './effects.js';
import './load-image.js';

const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 5;

const formElement = document.querySelector('.img-upload__form');
const inputHashtagElement = formElement.querySelector('.text__hashtags');
const inputCommentElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const uploadImageElement = document.querySelector('#upload-file');
const imageEditElement = document.querySelector('.img-upload__overlay');
const closeModalElement = document.querySelector('.img-upload__cancel');


// validation

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateComment = (value) => value.length <= MAX_LENGTH_COMMENT;

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter(Boolean);

  const transformTags = tags.map((tag) => tag.toLowerCase());

  const validTag = /^#[a-zа-яё0-9]{1,19}$/i;

  if (!tags.every((tag) => validTag.test(tag))) {
    return false;
  }

  if (tags.length > MAX_LENGTH_HASHTAG) {
    return false;
  }

  if (transformTags.length !== new Set(transformTags).size) {
    return false;
  }

  return true;
};

pristine.addValidator(inputCommentElement, validateComment, 'Длина комментария не больше 140 символов');
pristine.addValidator(inputHashtagElement, validateTags, 'Введите валидный хэштег');

inputCommentElement.addEventListener('change', () => {
  pristine.validate(inputCommentElement);
});

inputHashtagElement.addEventListener('change', () => {
  pristine.validate(inputHashtagElement);
});

// modal
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalHide();
  }
};

function modalShow() {
  imageEditElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function modalHide() {
  pristine.reset();
  formElement.reset();
  resetScale();
  resetEffects();
  imageEditElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// block submit button
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

// submit form
const setOnFormSubmit = (cb) => {
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(formElement));
      unblockSubmitButton();
    }
  });
};

uploadImageElement.addEventListener('change', () => {
  modalShow();
});

closeModalElement.addEventListener('click', () => {
  modalHide();
});

// not close modal if the focus element

inputCommentElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

inputCommentElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

inputHashtagElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

inputHashtagElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

export { modalHide, setOnFormSubmit };
