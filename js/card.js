'use strict';

(function () {
  var ESC_CLICK = 27;

  var popupClose;

  // Создание фрагмента с удобствами для отображения в карточке
  var mapFeaturesToDom = function (featuresArr) {
    var liFeatures = document.createElement('li');

    liFeatures.classList.add('feature');

    return featuresArr.reduce(function (fragment, featureName) {
      var li = liFeatures.cloneNode(true);

      li.classList.add('feature--' + featureName);

      fragment.appendChild(li);

      return fragment;
    }, document.createDocumentFragment());
  };

  // Создание фрагмента с фотографиями для отображения в карточке
  var picturesToDom = function (picturesArr) {
    var ulPicture = window.util.template.content.querySelector('.popup__pictures');

    return picturesArr.reduce(function (fragment, picture) {
      var liPicture = ulPicture.querySelector('li').cloneNode(true);
      liPicture.querySelector('img').src = picture;
      liPicture.querySelector('img').width = 70;

      fragment.appendChild(liPicture);

      return fragment;
    }, document.createDocumentFragment());
  };

  // Создание карточку, которая описывает жилье на основе темплейта
  var getMapCard = function (advert) {
    var similarMapCard = window.util.template.content.querySelector('.map__card');
    var mapCard = similarMapCard.cloneNode(true);
    var allP = mapCard.querySelectorAll('p');

    mapCard.querySelector('h3').textContent = advert.offer.title;
    mapCard.querySelector('small').textContent = advert.offer.address;
    mapCard.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD' + '/ночь';
    mapCard.querySelector('h4').textContent = window.data.apartmentType[advert.offer.type];
    allP[2].textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    allP[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = '';
    mapCard.querySelector('.popup__features').appendChild(mapFeaturesToDom(advert.offer.features));
    allP[4].textContent = advert.offer.description;
    mapCard.querySelector('.popup__pictures').innerHTML = '';
    mapCard.querySelector('.popup__pictures').appendChild(picturesToDom(advert.offer.photos));
    mapCard.querySelector('.popup__avatar').src = advert.author.avatar;
    mapCard.classList.add('hidden');

    return mapCard;
  };

  // Создание все карточки, которые описывают жилье на основе темплейта
  var getMapCards = function () {
    var adverts = window.data.advertArr;
    var filtersContainer = window.util.map.querySelector('.map__filters-container');

    var allAdverts = adverts.reduce(function (fragment, advert) {
      fragment.appendChild(getMapCard(advert));
      return fragment;
    }, document.createDocumentFragment());

    window.util.map.insertBefore(allAdverts, filtersContainer);
  };

  // Метод нахождения нужной карточки
  var addMapPinsEventListeners = function () {
    var mapPins = window.util.map.querySelectorAll('.map__pin');

    mapPins.forEach(function (mapPin) {
      mapPin.addEventListener('click', function (evt) {
        if (evt.currentTarget.className.indexOf('map__pin--main') !== -1) {
          return;
        }
        openMapCard(evt.currentTarget.querySelector('img').src);
      });
    });
  };

  var onMapCardEscPress = function (evt) {
    if (evt.keyCode === ESC_CLICK) {
      closeMapCard();
    }
  };

  // Метод открытия карточки
  var openMapCard = function (src) {
    var allCards = window.util.map.querySelectorAll('.map__card');

    allCards.forEach(function (card) {
      card.classList.add('hidden');
      if (card.querySelector('.popup__avatar').src === src) {
        card.classList.remove('hidden');
      }
    });

    document.addEventListener('keydown', onMapCardEscPress);
  };

  // Метод закрытия карточки
  var closeMapCard = function () {
    document.querySelector('.map__card:not(.hidden)').classList.add('hidden');

    document.removeEventListener('keydown', onMapCardEscPress);
  };

  getMapCards();

  popupClose = window.util.map.querySelectorAll('.popup__close');

  popupClose.forEach(function (close) {
    close.addEventListener('click', closeMapCard);
  });

  window.card = {
    getMapCards: getMapCards,
    addMapPinsEventListeners: addMapPinsEventListeners,
    closeMapCard: closeMapCard
  };
})();
