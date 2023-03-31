const IMAGE_VALUE = 10;

const Filter = {
  DEFAULT: 'filter-dafault',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let images = [];

const sortRandom = () => Math.random() - 0.5;

const sortComments = (imageA, imageB) => imageB.comments.length - imageA.comments.length;

const getFilteredImages = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...images].sort(sortRandom).slice(0, IMAGE_VALUE);
    case Filter.DISCUSSED:
      return [...images].sort(sortComments);
    default:
      return [...images];
  }
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const currentButton = evt.target;

    if (currentButton.id === currentFilter) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');

    currentButton.classList.add('img-filters__button--active');
    currentFilter = currentButton.id;
    callback(getFilteredImages());
  });
};

const init = (loadedImages, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  images = [...loadedImages];
  setOnFilterClick(callback);
};

export { getFilteredImages, init };
