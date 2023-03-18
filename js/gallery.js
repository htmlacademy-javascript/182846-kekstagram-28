import { drawThumbnails } from './thumb.js';
import { showFullPost } from './full-image.js';

const container = document.querySelector('.pictures');

const drawGallery = (posts) => {
  container.addEventListener('click', (evt) => {
    evt.preventDefault();

    const elementTarget = evt.target.closest('[data-thumb-id]');

    if (!elementTarget) {
      return;
    }

    const thumb = posts.find((item) => item.id === +elementTarget.dataset.thumbId);

    showFullPost(thumb);
  });

  drawThumbnails(posts, container);
};

export { drawGallery };
