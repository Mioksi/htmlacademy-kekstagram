'use strict';

(function () {
  var MAX_COMMENTS_AMOUNT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  var socialComments = bigPicture.querySelector('.social__comments');
  var commentItem = socialComments.querySelector('.social__comment');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsCount = socialCommentCount.querySelector('.comments-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var comments = [];

  var generateComments = function (comment) {
    var pictureComment = commentItem.cloneNode(true);

    pictureComment.querySelector('.social__picture').src = comment.avatar;
    pictureComment.querySelector('.social__picture').alt = comment.name;
    pictureComment.querySelector('.social__text').textContent = comment.message;

    return pictureComment;
  };

  var renderComments = function () {
    var fragment = document.createDocumentFragment();

    var currentComments = comments.splice(0, MAX_COMMENTS_AMOUNT);

    commentsLoader.classList.remove('hidden');

    if (comments.length === 0) {
      commentsLoader.classList.add('hidden');

      commentsLoader.removeEventListener('click', onLoaderButtonClick);
    }

    socialCommentCount.textContent = currentComments.length + ' из ' + commentsCount.textContent + ' комментариев';

    currentComments.forEach(function (item) {
      fragment.appendChild(generateComments(item));
    });

    socialComments.appendChild(fragment);
  };

  var renderBigPicture = function (picture) {
    bigPicture.querySelector('img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    commentsCount.textContent = picture.comments.length;

    socialComments.innerHTML = '';

    comments = picture.comments.slice();

    renderComments();

    bigPictureClose.addEventListener('click', onPreviewClose);
    document.addEventListener('keydown', onPictureEscPress);
  };

  var onLoaderButtonClick = function () {
    renderComments();

    socialCommentCount.textContent = socialComments.children.length + ' из ' + commentsCount.textContent + ' комментариев';
  };

  var openPreview = function (picture) {
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');

    renderBigPicture(picture);

    commentsLoader.addEventListener('click', onLoaderButtonClick);
  };

  var onPictureEscPress = function (evt) {
    window.utils.isEscEvent(evt, onPreviewClose);
  };

  var onPreviewClose = function () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');

    bigPictureClose.removeEventListener('click', onPreviewClose);
    document.removeEventListener('keydown', onPictureEscPress);

    commentsLoader.removeEventListener('click', onLoaderButtonClick);
  };

  window.preview = {
    open: openPreview
  };
})();
