const thumbnailTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({id, url, likes, comments}) => {
  const thumb = thumbnailTemplateElement.cloneNode(true);

  thumb.querySelector('.picture__img').src = url;
  thumb.querySelector('.picture__likes').textContent = likes;
  thumb.querySelector('.picture__comments').textContent = comments.length;
  thumb.dataset.thumbId = id;

  return thumb;
};

const drawThumbnails = (thumbnails, container) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());

  const fragment = document.createDocumentFragment();

  thumbnails.forEach((thumb) => {
    const element = createThumbnail(thumb);
    fragment.append(element);
  });

  container.append(fragment);
};

export { drawThumbnails };
