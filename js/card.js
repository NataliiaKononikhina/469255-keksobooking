'use strict';

(function () {
  var APARTMENT_TYPE = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  // Создание фрагмента с удобствами для отображения в карточке
  var renderMapFeatures = function (featuresArr) {
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
  var renderPictures = function (picturesArr) {
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
    mapCard.querySelector('h4').textContent = APARTMENT_TYPE[advert.offer.type];
    allP[2].textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    allP[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = '';
    mapCard.querySelector('.popup__features').appendChild(renderMapFeatures(advert.offer.features));
    allP[4].textContent = advert.offer.description;
    mapCard.querySelector('.popup__pictures').innerHTML = '';
    mapCard.querySelector('.popup__pictures').appendChild(renderPictures(advert.offer.photos));
    mapCard.querySelector('.popup__avatar').src = advert.author.avatar;
    mapCard.classList.add('hidden');

    return mapCard;
  };

  // Создание все карточки, которые описывают жилье на основе темплейта
  var getMapCards = function () {
    var adverts = window.card.adverts;
    var filtersContainer = window.util.map.querySelector('.map__filters-container');

    var allAdverts = adverts.reduce(function (fragment, advert) {
      fragment.appendChild(getMapCard(advert));
      return fragment;
    }, document.createDocumentFragment());

    window.util.map.insertBefore(allAdverts, filtersContainer);
  };

  // Метод нахождения нужной карточки
  var addMapPinsListeners = function () {
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

  // Метод открытия карточки
  var openMapCard = function (src) {
    var allCards = window.util.map.querySelectorAll('.map__card');
    var popupClose;

    allCards.forEach(function (card) {
      card.classList.add('hidden');
      if (card.querySelector('.popup__avatar').src === src) {
        card.classList.remove('hidden');
        popupClose = card.querySelector('.popup__close');
      }
    });

    document.addEventListener('keydown', closeMapCard);
    popupClose.addEventListener('click', closeMapCard);
    popupClose.addEventListener('keydown', closeMapCard);
  };

  // Метод закрытия карточки
  var closeMapCard = function (evt) {
    if (evt && evt.type !== 'click' && (evt.keyCode !== window.util.ENTER_CLICK) && (evt.keyCode !== window.util.ESC_CLICK)) {
      return;
    }

    var shownMapCard = document.querySelector('.map__card:not(.hidden)');

    if (shownMapCard) {
      var popupClose = shownMapCard.querySelector('.popup__close');

      shownMapCard.classList.add('hidden');
      popupClose.removeEventListener('click', closeMapCard);
      popupClose.removeEventListener('keydown', closeMapCard);
    }

    document.removeEventListener('keydown', closeMapCard);
  };

  var removeMapCards = function () {
    var mapCards = window.util.map.querySelectorAll('.map__card');

    mapCards.forEach(function (card) {
      card.remove();
    });
  };

  window.card = {
    getMapCards: getMapCards,
    addMapPinsListeners: addMapPinsListeners,
    closeMapCard: closeMapCard,
    adverts: [],
    removeMapCards: removeMapCards
  };
})();
