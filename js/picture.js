'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var generatePicture = function (picture) {
    var pictureItem = pictureTemplate.cloneNode(true);

    pictureItem.querySelector('img').src = picture.url;
    pictureItem.querySelector('.picture__likes').textContent = picture.likes;
    pictureItem.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureItem.addEventListener('click', function () {
      window.preview.openPreview(picture);
    });

    return pictureItem;
  };

  var renderAllPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      fragment.appendChild(generatePicture(picture));
    });

    window.utils.picturesContainer.appendChild(fragment);
  };

  window.picture = {
    render: renderAllPictures
  };
})();
