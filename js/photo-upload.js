'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_PREVIEW_WIDTH = '200%';

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview img');

  var photoFileChooser = document.querySelector('#images');

  var photoUpload = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarFileChooserChange = function () {
    photoUpload(avatarFileChooser, avatarPreview);
  };

  var onPhotoFileChooserChange = function () {
    var photoPreview = document.createElement('img');
    var formPhotoContainer = document.querySelector('.form__photo-container');

    photoPreview.style.width = PHOTO_PREVIEW_WIDTH;
    formPhotoContainer.appendChild(photoPreview);

    photoUpload(photoFileChooser, photoPreview);
  };

  avatarFileChooser.addEventListener('change', onAvatarFileChooserChange);
  photoFileChooser.addEventListener('change', onPhotoFileChooserChange);
})();
