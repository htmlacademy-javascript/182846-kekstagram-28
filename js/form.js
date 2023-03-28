import { isEscapeKey } from './utils.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 5;

const form = document.querySelector('.img-upload__form');
const inputHashtag = form.querySelector('.text__hashtags');
const inputComment = form.querySelector('.text__description');
const submitButtonElement = form.querySelector('.img-upload__submit');
const uploadImage = document.querySelector('#upload-file');
const imageEdit = document.querySelector('.img-upload__overlay');
const closeModal = document.querySelector('.img-upload__cancel');


// validation

const pristine = new Pristine(form, {
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

pristine.addValidator(inputComment, validateComment, 'Длина комментария не больше 140 символов');
pristine.addValidator(inputHashtag, validateTags, 'Введите валидный хэштег');

inputComment.addEventListener('change', () => {
  pristine.validate(inputComment);
});

inputHashtag.addEventListener('change', () => {
  pristine.validate(inputHashtag);
});

// modal
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalHide();
  }
};

function modalShow() {
  imageEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function modalHide() {
  pristine.reset();
  form.reset();
  resetScale();
  resetEffects();
  imageEdit.classList.add('hidden');
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
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

uploadImage.addEventListener('change', () => {
  modalShow();
});

closeModal.addEventListener('click', () => {
  modalHide();
});

// not close modal if the focus element

inputComment.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

inputComment.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

inputHashtag.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

inputHashtag.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

export { modalHide, setOnFormSubmit };
