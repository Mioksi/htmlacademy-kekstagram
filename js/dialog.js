'use strict';

(function () {
  var main = document.querySelector('main');

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);

    var removeDialog = function () {
      success.remove();

      success.removeEventListener('click', onDialogClick);
      document.removeEventListener('keydown', onDialogEscPress);
    };

    var onDialogClick = function (evt) {
      if (!evt.target.classList.contains('success__title')) {
        removeDialog();
      }
    };

    var onDialogEscPress = function (evt) {
      window.utils.isEscEvent(evt, removeDialog);
    };

    window.form.close();

    success.addEventListener('click', onDialogClick);
    document.addEventListener('keydown', onDialogEscPress);

    main.insertAdjacentElement('afterbegin', success);
  };

  var onError = function (errorMessage, errorButtonMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    var removeDialog = function () {
      error.remove();

      error.removeEventListener('click', onDialogClick);
      document.removeEventListener('keydown', onDialogEscPress);
    };

    var onDialogClick = function (evt) {
      if (!evt.target.classList.contains('error__title')) {
        removeDialog();
      }
    };

    var onDialogEscPress = function (evt) {
      window.utils.isEscEvent(evt, removeDialog);
    };

    error.querySelector('.error__title').textContent = errorMessage;
    error.querySelector('.error__button').textContent = errorButtonMessage;

    error.addEventListener('click', onDialogClick);
    document.addEventListener('keydown', onDialogEscPress);

    main.insertAdjacentElement('afterbegin', error);
  };

  window.dialog = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
