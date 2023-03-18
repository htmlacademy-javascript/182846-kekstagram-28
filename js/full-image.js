import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;
let commentsCount = 0;
let comments = [];

const fullPictureContainer = document.querySelector('.big-picture');
const commentList = fullPictureContainer.querySelector('.social__comments');
const closeModal = document.querySelector('.big-picture__cancel');
const buttonLoadComments = document.querySelector('.comments-loader');
const valueComments = document.querySelector('.social__comment-count');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

// modal
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalHide();
  }
};

function modalShow() {
  fullPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function modalHide() {
  fullPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount = 0;

  document.removeEventListener('keydown', onDocumentKeydown);
}

closeModal.addEventListener('click', () => {
  modalHide();
});

// draw big image
const drawFullPost = (obj) => {
  fullPictureContainer.querySelector('.big-picture__img img').src = obj.url;
  fullPictureContainer.querySelector('.likes-count').textContent = obj.likes;
  fullPictureContainer.querySelector('.comments-count').textContent = obj.comments.length;
  fullPictureContainer.querySelector('.social__caption').textContent = obj.description;
};

// draw comments
const createComment = ({avatar, message, name}) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const drawComments = () => {
  commentsCount += COMMENTS_STEP;

  if (commentsCount >= comments.length) {
    buttonLoadComments.classList.add('hidden');
    commentsCount = comments.length;
  } else {
    buttonLoadComments.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsCount; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  valueComments.innerHTML = `${commentsCount} из <span class="comments-count">${comments.length}</span> комментариев`;
};

buttonLoadComments.addEventListener('click', () => {
  drawComments();
});

const showFullPost = (data) => {
  modalShow();
  drawFullPost(data);
  comments = data.comments.slice();
  drawComments();
};

export {showFullPost};
