import { isEscapeKey } from './utils.js';

const successMessageElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = successMessageElement.cloneNode(true);
const errorMessage = errorMessageElement.cloneNode(true);
const removeSuccessMessage = successMessage.querySelector('.success__button');
const removeErrorMessage = errorMessage.querySelector('.error__button');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessMessage();
    hideErrorMessage();
  }
};

const showSuccessMessage = () => {
  document.body.append(successMessage);

  document.addEventListener('keydown', onDocumentKeydown);
};

const showErrorMessage = () => {
  document.body.append(errorMessage);

  document.addEventListener('keydown', onDocumentKeydown);
};

function hideSuccessMessage() {
  successMessage.remove();

  document.removeEventListener('keydown', onDocumentKeydown);
}

function hideErrorMessage() {
  errorMessage.remove();

  document.removeEventListener('keydown', onDocumentKeydown);
}

removeSuccessMessage.addEventListener('click', hideSuccessMessage);
removeErrorMessage.addEventListener('click', hideErrorMessage);

successMessage.addEventListener('click', (evt) => {
  if (evt.target !== successMessage.querySelector('.success__inner')) {
    hideSuccessMessage();
  }
});

errorMessage.addEventListener('click', (evt) => {
  if (evt.target !== successMessage.querySelector('.error__inner')) {
    hideSuccessMessage();
  }
});

export {showSuccessMessage, showErrorMessage};
