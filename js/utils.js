'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[j];

      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  };

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    shuffleArray: shuffleArray
  };
})();
