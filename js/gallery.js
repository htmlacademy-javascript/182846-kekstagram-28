import {createPosts} from './data.js';

const galleryList = document.querySelector('.pictures');

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const posts = createPosts();

const postFragment = document.createDocumentFragment();

posts.forEach(({url, likes, comments}) => {
  const post = thumbnailTemplate.cloneNode(true);
  post.querySelector('.picture__img').src = url;
  post.querySelector('.picture__likes').textContent = likes;
  post.querySelector('.picture__comments').textContent = comments.length;
  postFragment.append(post);
});

galleryList.append(postFragment);
