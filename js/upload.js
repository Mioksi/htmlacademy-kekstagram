'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var picture = document.querySelector('.img-upload__preview img');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var effectsPreviews = imgUploadOverlay.querySelectorAll('.effects__preview');

  var loadPicture = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        picture.src = reader.result;

        effectsPreviews.forEach(function (preview) {
          preview.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });

      reader.readAsDataURL(file);
    }
  };

  var resetPictures = function () {
    picture.src = 'img/upload-default-image.jpg';

    effectsPreviews.forEach(function (preview) {
      preview.style.backgroundImage = '';
    });
  };

  window.upload = {
    loadPicture: loadPicture,
    resetPictures: resetPictures
  };
})();
