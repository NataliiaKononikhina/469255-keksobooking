'use strict';

// Тип жилья:
var APARTMENT_TYPE = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};
// Заголовок объявления:
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
// Удобства:
var FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var ESC_CLICK = 27;

var map = document.querySelector('.map');
var numberOfAds = 8;
var fieldset = document.querySelectorAll('fieldset');
var mapPinMain = map.querySelector('.map__pin--main');
var popupClose;
var address = document.querySelector('#address');

// Метод нахождения рандомного числа от min до max
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Выбор аватара
var getAvatar = function (avatarNumber) {
  return 'img/avatars/user0' + (avatarNumber + 1) + '.png';
};

// Рандомный выбор жилья
var getRandomType = function () {
  var types = Object.keys(APARTMENT_TYPE);

  return types[getRandomNumber(0, types.length - 1)];
};

// Получение рандомного количества удобств без повторений
var getFeatures = function (featuresList) {
  var features = [];
  var featuresListCopy = featuresList.slice();

  for (var i = 0; i < getRandomNumber(0, 6); i++) {
    var randomIndex = getRandomNumber(0, featuresListCopy.length - 1);

    features.push(featuresListCopy[randomIndex]);
    featuresListCopy.splice(randomIndex, 1);
  }

  return features;
};

// Создание массива из 8 объявлений о жилье
var getArr = function () {
  var arr = [];

  for (var i = 0; i < numberOfAds; i++) {
    var xCoordinate = getRandomNumber(300, 900);
    var yCoordinate = getRandomNumber(150, 500);

    arr.push({
      author: {
        avatar: getAvatar(i)
      },
      offer: {
        title: TITLES[i],
        address: xCoordinate + ', ' + yCoordinate,
        price: getRandomNumber(1000, 1000000),
        type: getRandomType(),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 40),
        checkin: getRandomNumber(12, 14) + ':00',
        checkout: getRandomNumber(12, 14) + ':00',
        features: getFeatures(FEATURES_LIST),
        description: '',
        photos: [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
        ]
      },
      location: {
        x: xCoordinate,
        y: yCoordinate
      }
    });
  }

  return arr;
};

// Удаление класса у любого узла
var removeClass = function (selector, className) {
  var node = document.querySelector(selector);

  node.classList.remove(className);
};

// Создание фрагмента с метоками квартир для карты города
var getMapPins = function () {
  var arr = getArr();
  var template = document.querySelector('template');
  var similarMapPin = template.content.querySelector('.map__pin');
  var mapPinsFragment = document.createDocumentFragment();

  for (var i = 0; i < numberOfAds; i++) {
    var mapPin = similarMapPin.cloneNode(true);

    mapPin.style.left = arr[i].location.x + 'px';
    mapPin.style.top = arr[i].location.y + 'px';
    mapPin.querySelector('img').src = arr[i].author.avatar;

    mapPinsFragment.appendChild(mapPin);
  }

  return mapPinsFragment;
};

// Добавление меток на карту города
var buildPinsFragment = function () {
  var mapPins = map.querySelector('.map__pins');

  mapPins.appendChild(getMapPins());
};

// Создание фрагмента с удобствами для отображения в карточке
var mapFeaturesToDom = function (featuresArr) {
  var fragment = document.createDocumentFragment();
  var liFeatures = document.createElement('li');

  liFeatures.classList.add('feature');

  featuresArr.forEach(function (featureName) {
    var li = liFeatures.cloneNode(true);

    li.classList.add('feature--' + featureName);

    fragment.appendChild(li);
  });

  return fragment;
};

// Создание фрагмента с фотографиями для отображения в карточке
var picturesToDom = function (picturesArr) {
  var template = document.querySelector('template');
  var ulPicture = template.content.querySelector('.popup__pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < picturesArr.length; i++) {
    var liPicture = ulPicture.querySelector('li').cloneNode(true);
    liPicture.querySelector('img').src = picturesArr[i];
    liPicture.querySelector('img').width = 70;

    fragment.appendChild(liPicture);
  }

  return fragment;
};

// Создание карточку, которая описывает жилье на основе темплейта
var getMapCard = function (advert) {
  var template = document.querySelector('template');
  var similarMapCard = template.content.querySelector('.map__card');
  var mapCard = similarMapCard.cloneNode(true);
  var allP = mapCard.querySelectorAll('p');

  mapCard.querySelector('h3').textContent = advert.offer.title;
  mapCard.querySelector('small').textContent = advert.offer.address;
  mapCard.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD' + '/ночь';
  mapCard.querySelector('h4').textContent = APARTMENT_TYPE[advert.offer.type];
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
  var adverts = getArr();
  var fragment = document.createDocumentFragment();
  var filtersContainer = map.querySelector('.map__filters-container');

  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(getMapCard(adverts[i]));
  }

  map.insertBefore(fragment, filtersContainer);
};

// Метод нахождения нужной карточки
var addMapPinsEventListeners = function () {
  var mapPins = map.querySelectorAll('.map__pin');

  mapPins.forEach(function (mapPin) {
    mapPin.addEventListener('click', function (evt) {
      if (evt.currentTarget.className.indexOf('map__pin--main') !== -1) {
        return;
      }
      openMapCard(evt.currentTarget.querySelector('img').src);
    });
  });
};

// Добавление атрибута disabled формам
var deactivateFieldset = function () {
  fieldset.forEach(function (element) {
    element.disabled = true;
  });
};

// Нахождение адреса метки
var getAddress = function (element) {
  return element.offsetLeft + ', ' + element.offsetTop;
};

// Добавление адреса в поле "Адрес"
var setAddress = function () {
  address.value = getAddress(mapPinMain);
};

// Метод активации страницы
var activate = function () {
  removeClass('.map', 'map--faded');
  removeClass('.notice__form', 'notice__form--disabled');
  fieldset.forEach(function (element) {
    element.disabled = false;
  });
  buildPinsFragment();
  addMapPinsEventListeners();
  setAddress();
  mapPinMain.removeEventListener('mouseup', activate);
};

var onMapCardEscPress = function (evt) {
  if (evt.keyCode === ESC_CLICK) {
    closeMapCard();
  }
};

// Метод открытия карточки
var openMapCard = function (src) {
  var allCards = map.querySelectorAll('.map__card');

  for (var i = 0; i < allCards.length; i++) {
    allCards[i].classList.add('hidden');
    if (allCards[i].querySelector('.popup__avatar').src === src) {
      allCards[i].classList.remove('hidden');
    }
  }
  document.addEventListener('keydown', onMapCardEscPress);
};

// Метод закрытия карточки
var closeMapCard = function () {
  document.querySelector('.map__card:not(.hidden)').classList.add('hidden');

  document.removeEventListener('keydown', onMapCardEscPress);
};

deactivateFieldset();
setAddress();
getMapCards();

popupClose = map.querySelectorAll('.popup__close');

mapPinMain.addEventListener('mouseup', activate);

popupClose.forEach(function (close) {
  close.addEventListener('click', closeMapCard);
});
