'use strict';

(function () {
  var imgUploadForm = window.utils.imgUploadForm;
  var uploadFile = imgUploadForm.querySelector('#upload-file');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var imgUploadClose = imgUploadOverlay.querySelector('.img-upload__cancel');
  var textHashtags = window.utils.textHashtags;

  var onFormClose = function () {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    imgUploadForm.reset();

    imgUploadClose.removeEventListener('click', onFormClose);
    textHashtags.removeEventListener('change', window.validation.onHashtagChange);
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

    imgUploadClose.addEventListener('click', onFormClose);
    textHashtags.addEventListener('change', window.validation.onHashtagChange);
    document.addEventListener('keydown', onFormEscPress);
  });
})();
