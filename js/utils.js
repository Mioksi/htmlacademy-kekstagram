'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var picturesContainer = document.querySelector('.pictures');
  var imgUploadForm = picturesContainer.querySelector('.img-upload__form');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var textHashtags = imgUploadForm.querySelector('.text__hashtags');
  var imageUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');

  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');

  var scale = imgUploadOverlay.querySelector('.scale');

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
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
    isEscEvent: isEscEvent,
    shuffleArray: shuffleArray,
    picturesContainer: picturesContainer,
    imgUploadForm: imgUploadForm,
    imgUploadOverlay: imgUploadOverlay,
    textHashtags: textHashtags,
    effectLevel: effectLevel,
    effectLevelPin: effectLevelPin,
    imageUploadPreview: imageUploadPreview,
    scale: scale
  };
})();
