'use strict';

(function () {
  var PICTURES_AMOUNT = 25;

  var picturesContainer = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var createPicturesArray = function (picturesAmount) {
    var pictures = [];

    for (var i = 0; i < picturesAmount; i++) {
      var picture = window.data.generatePictures(i);

      pictures.push(picture);
    }

    return pictures;
  };

  var pictures = createPicturesArray(PICTURES_AMOUNT);

  var generatePicture = function (picture) {
    var pictureItem = pictureTemplate.cloneNode(true);

    pictureItem.querySelector('img').src = picture.url;
    pictureItem.querySelector('.picture__likes').textContent = picture.likes;
    pictureItem.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureItem;
  };

  var renderAllPictures = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(generatePicture(pictures[i]));
    }

    picturesContainer.appendChild(fragment);
  };

  window.picture = {
    render: renderAllPictures
  };
})();
