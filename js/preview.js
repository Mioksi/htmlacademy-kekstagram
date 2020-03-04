'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var createCommentsArray = function (commentsAmount) {
    var comments = [];

    for (var i = 0; i < commentsAmount; i++) {
      var comment = window.data.generateComments(i);

      comments.push(comment);
    }

    return comments;
  };

  var renderComments = function (commentsData) {
    var pictureComments = '';

    commentsData.forEach(function (comment) {
      pictureComments += '<li class="social__comment"><img class="social__picture" src="' + comment.avatar + '"alt="' + comment.name + '"width="35" height="35"><p class="social__text">' + comment.message + '</p></li>';
    });

    return pictureComments;
  };

  var renderBigPicture = function (picture) {
    bigPicture.querySelector('img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.social__comments').innerHTML = renderComments(picture.comments);

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  };

  window.preview = {
    createCommentsArray: createCommentsArray,
    renderBigPicture: renderBigPicture
  };
})();
