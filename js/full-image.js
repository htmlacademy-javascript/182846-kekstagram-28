import { posts } from './posts.js';
import { isEscapeKey } from './utils.js';

const containerPictures = document.querySelector('.pictures');
const fullPictureContainer = document.querySelector('.big-picture');
const allPictures = [...document.querySelectorAll('.picture')];
const closeModal = document.querySelector('.big-picture__cancel');

// modal
let modalHide = null;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalHide();
  }
};

const modalShow = () => {
  fullPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

modalHide = () => {
  fullPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

closeModal.addEventListener('click', () => {
  modalHide();
});

// draw big image
const drawFullPost = (container, obj) => {
  const commentList = container.querySelector('.social__comments');

  container.querySelector('.big-picture__img img').src = obj.url;
  container.querySelector('.likes-count').textContent = obj.likes;
  container.querySelector('.comments-count').textContent = obj.comments.length;
  container.querySelector('.social__caption').textContent = obj.description;
  commentList.innerHTML = '';

  obj.comments.forEach(({avatar, message, name}) => {
    const comment = `
      <li class="social__comment">
        <img
            class="social__picture"
            src=${avatar}
            alt=${name}
            width="35" height="35">
        <p class="social__text">${message}</p>
      </li>`;

    commentList.insertAdjacentHTML('afterbegin', comment);
  });
};

const onThumbClick = (evt) => {
  evt.preventDefault();

  const elementTarget = evt.target.closest('.picture');
  const indexTarget = allPictures.indexOf(elementTarget);
  const data = posts[indexTarget];

  if (elementTarget) {
    drawFullPost(fullPictureContainer, data);
    fullPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
    fullPictureContainer.querySelector('.comments-loader').classList.add('hidden');
    modalShow();
  }
};

containerPictures.addEventListener('click', onThumbClick);
