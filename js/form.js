'use strict';

(function () {
  var imgUploadForm = window.utils.imgUploadForm;
  var uploadFile = imgUploadForm.querySelector('#upload-file');
  var imgUploadOverlay = window.utils.imgUploadOverlay;
  var imgUploadClose = imgUploadOverlay.querySelector('.img-upload__cancel');
  var textHashtags = window.utils.textHashtags;
  var effectsList = imgUploadOverlay.querySelector('.effects__list');

  var onFormClose = function () {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    imgUploadForm.reset();
    window.effects.setDefault();

    imgUploadClose.removeEventListener('click', onFormClose);
    textHashtags.removeEventListener('change', window.validation.onHashtagChange);
    window.utils.effectLevelPin.removeEventListener('mousedown', window.effects.onPinMove);
    effectsList.removeEventListener('change', window.effects.onEffectChange);
    document.removeEventListener('keydown', onFormEscPress);
  };

  var onFormEscPress = function (evt) {
    if (!evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      window.utils.isEscEvent(evt, onFormClose);
    }
  };

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();

    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    window.utils.effectLevel.classList.add('hidden');

    imgUploadClose.addEventListener('click', onFormClose);
    textHashtags.addEventListener('change', window.validation.onHashtagChange);
    window.utils.effectLevelPin.addEventListener('mousedown', window.effects.onPinMove);
    effectsList.addEventListener('change', window.effects.onEffectChange);
    document.addEventListener('keydown', onFormEscPress);
  });
})();
