'use strict';

(function () {
  var DEFAULT_PICTURE_SIZE = 100;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var SIZE_STEP = 25;

  var currentSize = DEFAULT_PICTURE_SIZE;

  var scale = window.utils.scale;
  var scaleValue = scale.querySelector('.scale__control--value');

  var setPictureSize = function (pictureSize) {
    scaleValue.value = pictureSize + '%';
    window.utils.imageUploadPreview.style.transform = 'scale(' + pictureSize / 100 + ')';
  };

  var onControlSmallerClick = function () {
    if (currentSize > MIN_SIZE) {
      currentSize -= SIZE_STEP;
    }

    setPictureSize(currentSize);
  };

  var onControlBiggerClick = function () {
    if (currentSize < MAX_SIZE) {
      currentSize += SIZE_STEP;
    }

    setPictureSize(currentSize);
  };

  var resetPictureSize = function () {
    currentSize = DEFAULT_PICTURE_SIZE;

    setPictureSize(currentSize);
  };

  window.scale = {
    onControlSmallerClick: onControlSmallerClick,
    onControlBiggerClick: onControlBiggerClick,
    resetPictureSize: resetPictureSize
  };
})();
