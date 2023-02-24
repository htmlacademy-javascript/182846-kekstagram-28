const DESCRIPTIONS = [
  'Кофе',
  'Цветы',
  'Море',
  'Обед',
  'Закат',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME_USERS = [
  'Петя',
  'Ваня',
  'Катя',
  'Марина',
  'Олег',
];

const QUANTITY_POST = 25;

// utils
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomValue = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomId = createRandomValue(1, 25);
const createRandomUrlImage = createRandomValue(1, 25);

const createPost = () => {
  const createRandomIdComments = createRandomValue(1, 5);

  const createComment = () => ({
    id: createRandomIdComments(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAME_USERS),
  });

  return {
    id: createRandomId(),
    url: `photos/${createRandomUrlImage()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(1, 5)}, createComment)
  };
};

const posts = Array.from({length: QUANTITY_POST}, createPost);

posts.slice();
