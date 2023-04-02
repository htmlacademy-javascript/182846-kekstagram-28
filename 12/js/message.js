import { isEscapeKey } from './utils.js';

const successMessageElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = successMessageElement.cloneNode(true);
const errorMessage = errorMessageElement.cloneNode(true);
const closeSuccessMessageElement = successMessage.querySelector('.success__button');
const closeErrorMessageElement = errorMessage.querySelector('.error__button');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseSuccessMessageClick();
    onCloseErrorMessageClick();
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

function onCloseSuccessMessageClick() {
  successMessage.remove();

  document.removeEventListener('keydown', onDocumentKeydown);
}

function onCloseErrorMessageClick() {
  errorMessage.remove();

  document.removeEventListener('keydown', onDocumentKeydown);
}

closeSuccessMessageElement.addEventListener('click', onCloseSuccessMessageClick);
closeErrorMessageElement.addEventListener('click', onCloseErrorMessageClick);

successMessage.addEventListener('click', (evt) => {
  if (evt.target !== successMessage.querySelector('.success__inner')) {
    onCloseSuccessMessageClick();
  }
});

errorMessage.addEventListener('click', (evt) => {
  if (evt.target !== errorMessage.querySelector('.error__inner')) {
    onCloseErrorMessageClick();
  }
});

export {showSuccessMessage, showErrorMessage};
