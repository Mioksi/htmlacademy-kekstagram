'use strict';

(function () {
  var onSuccess = function (data) {
    window.picture.render(data);
  };

  var onError = function (errorMessage) {
    window.dialog.onError(errorMessage, 'Попробовать снова');

    retryLoading();
  };

  var retryLoading = function () {
    var errorButton = document.querySelector('.error__button');

    if (errorButton) {
      errorButton.addEventListener('click', function () {
        window.backend.load(onSuccess, onError);
      });
    }
  };

  window.backend.load(onSuccess, onError);
})();
