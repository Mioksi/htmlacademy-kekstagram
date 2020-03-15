'use strict';

(function () {
  var NEW_PICTURES_AMOUNT = 10;

  var pictures = [];

  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilters.querySelector('.img-filters__form');

  var onSuccess = function (data) {
    pictures = data;

    window.picture.render(pictures);

    imgFilters.classList.remove('img-filters--inactive');

    imgFiltersForm.addEventListener('click', onFilterChange);
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

  var showDefaultPictures = function () {
    window.picture.render(pictures);
  };

  var showRandomPictures = function () {
    var picturesCopy = pictures.slice();

    var randomPictures = window.utils.shuffleArray(picturesCopy).slice(0, NEW_PICTURES_AMOUNT);

    window.picture.render(randomPictures);
  };

  var showDiscussedPictures = function () {
    var discussedPictures = pictures.slice();

    discussedPictures.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });

    window.picture.render(discussedPictures);
  };

  var filters = {
    'filter-default': showDefaultPictures,
    'filter-random': showRandomPictures,
    'filter-discussed': showDiscussedPictures
  };

  var removeAllPictures = function () {
    var picture = document.querySelectorAll('.picture');

    picture.forEach(function (item) {
      item.remove();
    });
  };

  var toggleActiveFilter = function (evt) {
    var activeFilter = imgFiltersForm.querySelector('.img-filters__button--active');

    activeFilter.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  };

  var onFilterChange = window.debounce(function (evt) {
    removeAllPictures();
    toggleActiveFilter(evt);
    filters[evt.target.id]();
  });

  window.backend.load(onSuccess, onError);
})();
