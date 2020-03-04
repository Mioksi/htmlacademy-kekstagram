'use strict';

(function () {
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 10;
  var MIN_PICTURE_COMMENTS = 1;
  var MAX_PICTURE_COMMENTS = 2;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  var NAMES = [
    'Дмитрий',
    'Наталья',
    'Ким',
    'Анна',
    'Степан',
    'Харитон',
  ];

  var getPictureUrl = function (index) {
    return 'photos/' + (index + 1) + '.jpg';
  };

  var generatePictures = function (i) {
    return {
      url: getPictureUrl(i),
      description: window.utils.getRandomElement(COMMENTS),
      likes: window.utils.getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: window.preview.createCommentsArray(window.utils.getRandomInteger(MIN_COMMENTS, MAX_COMMENTS))
    };
  };

  var getAvatarSrc = function () {
    return 'img/avatar-' + window.utils.getRandomInteger(1, 6) + '.svg';
  };

  var generateComments = function () {
    return {
      avatar: getAvatarSrc(),
      name: window.utils.getRandomElement(NAMES),
      message: window.utils.shuffleArray(COMMENTS).slice(0, window.utils.getRandomInteger(MIN_PICTURE_COMMENTS, MAX_PICTURE_COMMENTS)).join(' ')
    };
  };

  window.data = {
    generatePictures: generatePictures,
    generateComments: generateComments
  };
})();
