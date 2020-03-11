'use strict';

(function () {
  var DEFAULT_VALUE = 100;
  var MAX_INVERT_VALUE = 100;
  var MAX_BLUR_VALUE = 3;
  var MIN_BRIGHTNESS_VALUE = 1;
  var MAX_BRIGHTNESS_VALUE = 2;

  var currentEffect = '';

  var effectLevel = window.utils.effectLevel;
  var effectLevelPin = window.utils.effectLevelPin;
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');

  var imageUploadPreview = window.utils.imageUploadPreview;

  var setDefault = function () {
    effectLevelPin.style.left = DEFAULT_VALUE + '%';
    effectLevelDepth.style.width = DEFAULT_VALUE + '%';
    effectLevelValue.value = DEFAULT_VALUE;

    imageUploadPreview.style.filter = '';
    imageUploadPreview.className = '';
  };

  var onEffectChange = function (evt) {
    setDefault();

    if (evt.target.value !== 'none') {
      currentEffect = evt.target.value;

      effectLevel.classList.remove('hidden');
      imageUploadPreview.classList.add('effects__preview--' + evt.target.value);
    } else {
      effectLevel.classList.add('hidden');
    }
  };

  var onPinMove = function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var pinCoordX = effectLevelPin.offsetLeft - shift;

      startCoords = moveEvt.clientX;

      if (pinCoordX < 0) {
        pinCoordX = 0;
      } else if (pinCoordX > effectLevelLine.offsetWidth) {
        pinCoordX = effectLevelLine.offsetWidth;
      }

      var currentEffectValue = pinCoordX / effectLevelLine.offsetWidth;

      effectLevelPin.style.left = pinCoordX + 'px';
      effectLevelDepth.style.width = Math.round(currentEffectValue * 100) + '%';
      effectLevelValue.value = Math.round(currentEffectValue * 100);

      applyEffect(currentEffectValue);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var applyEffect = function (currentEffectValue) {
    var effect = {
      'chrome': 'grayscale(' + currentEffectValue + ')',
      'sepia': 'sepia(' + currentEffectValue + ')',
      'marvin': 'invert(' + currentEffectValue * MAX_INVERT_VALUE + '%' + ')',
      'phobos': 'blur(' + currentEffectValue * MAX_BLUR_VALUE + 'px' + ')',
      'heat': 'brightness(' + (MIN_BRIGHTNESS_VALUE + currentEffectValue * MAX_BRIGHTNESS_VALUE) + ')'
    };

    imageUploadPreview.style.filter = effect[currentEffect];
  };

  window.effects = {
    onPinMove: onPinMove,
    setDefault: setDefault,
    onEffectChange: onEffectChange
  };
})();
