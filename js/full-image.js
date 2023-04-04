import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;
let commentsCount = 0;
let comments = [];

const fullPictureContainerElement = document.querySelector('.big-picture');
const commentListElement = fullPictureContainerElement.querySelector('.social__comments');
const closeModalElement = document.querySelector('.big-picture__cancel');
const buttonLoadCommentsElement = document.querySelector('.comments-loader');
const valueCommentsElement = document.querySelector('.social__comment-count');

const commentTemplateElement = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalHide();
  }
};

function modalShow() {
  fullPictureContainerElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function modalHide() {
  fullPictureContainerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount = 0;

  document.removeEventListener('keydown', onDocumentKeydown);
}

closeModalElement.addEventListener('click', () => {
  modalHide();
});

const drawFullPost = (obj) => {
  fullPictureContainerElement.querySelector('.big-picture__img img').src = obj.url;
  fullPictureContainerElement.querySelector('.likes-count').textContent = obj.likes;
  fullPictureContainerElement.querySelector('.comments-count').textContent = obj.comments.length;
  fullPictureContainerElement.querySelector('.social__caption').textContent = obj.description;
};

const createComment = ({avatar, message, name}) => {
  const comment = commentTemplateElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const drawComments = () => {
  commentsCount += COMMENTS_STEP;

  if (commentsCount >= comments.length) {
    buttonLoadCommentsElement.classList.add('hidden');
    commentsCount = comments.length;
  } else {
    buttonLoadCommentsElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsCount; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  valueCommentsElement.innerHTML = `${commentsCount} из <span class="comments-count">${comments.length}</span> комментариев`;
};

buttonLoadCommentsElement.addEventListener('click', () => {
  drawComments();
});

const showFullPost = (data) => {
  modalShow();
  drawFullPost(data);
  comments = data.comments.slice();
  drawComments();
};

export {showFullPost};
