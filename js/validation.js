'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var HASHTAG_LENGTH = 20;
  var HASHTAG_VALIDATION = /^[#a-zа-яё\d]+$/;

  var textHashtags = window.utils.textHashtags;

  var onHashtagChange = function () {
    var errors = [];

    var inputHashtags = textHashtags.value.toLowerCase().trim();
    var hashtagsArray = inputHashtags.split(/\s+/);

    var isFirstNoLattice = hashtagsArray.some(function (item) {
      return item[0] !== '#';
    });

    var isSpecialSymbols = hashtagsArray.every(function (item) {
      return item.match(HASHTAG_VALIDATION);
    });

    var isOnlyLatice = hashtagsArray.some(function (item) {
      return item === '#';
    });

    var isManySymbols = hashtagsArray.some(function (item) {
      return item.length > HASHTAG_LENGTH;
    });

    var isNoSpace = hashtagsArray.some(function (item) {
      return item.indexOf('#', 1) >= 1;
    });

    var isDuplicateHashtags = hashtagsArray.some(function (item, i, array) {
      return array.indexOf(item, i + 1) === i + 1;
    });

    textHashtags.setCustomValidity('');

    if (!inputHashtags) {
      return;
    }

    if (isFirstNoLattice) {
      errors.push('Хеш-тег должен начинаться с # (решётки)');
    }

    if (!isSpecialSymbols) {
      errors.push('Хеш-тег должен состоять только из букв и цифр');
    }

    if (isOnlyLatice) {
      errors.push('Хеш-тег не может состоять только из # (решётки)');
    }
    if (isManySymbols) {
      errors.push('Максимальная длина хэш-тега не должна превышать 20 символов');
    }

    if (isNoSpace) {
      errors.push('Хэш-теги должны разделяться пробелами');
    }

    if (isDuplicateHashtags) {
      errors.push('Хэш-теги не должны повторяться');
    }

    if (hashtagsArray.length > MAX_HASHTAGS) {
      errors.push('Используйте не более пяти хеш-тегов');
    }

    textHashtags.setCustomValidity(errors.join('. \n'));
  };

  window.validation = {
    onHashtagChange: onHashtagChange
  };
})();
