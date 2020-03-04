'use strict';

(function () {
  var imgUploadForm = window.utils.picturesContainer.querySelector('.img-upload__form');
  var uploadFile = imgUploadForm.querySelector('#upload-file');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var imgUploadClose = imgUploadOverlay.querySelector('.img-upload__cancel');

  var onFormClose = function () {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    imgUploadClose.removeEventListener('click', onFormClose);
    document.removeEventListener('keydown', onFormEscPress);
  };

  var onFormEscPress = function (evt) {
    window.utils.isEscEvent(evt, onFormClose);
  };

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();

    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    imgUploadClose.addEventListener('click', onFormClose);
    document.addEventListener('keydown', onFormEscPress);
  });
})();
