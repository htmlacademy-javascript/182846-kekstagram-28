import { drawThumbnails } from './thumb.js';
import { showFullPost } from './full-image.js';

const containerElement = document.querySelector('.pictures');

let images = [];

const onContainerClick = (evt) => {
  const elementTarget = evt.target.closest('[data-thumb-id]');

  if (!elementTarget) {
    return;
  }

  const thumb = images.find((item) => item.id === +elementTarget.dataset.thumbId);

  showFullPost(thumb);
};

const drawGallery = (currentImages) => {
  images = currentImages;
  drawThumbnails(images, containerElement);
  containerElement.addEventListener('click', onContainerClick);
};

export { drawGallery };
