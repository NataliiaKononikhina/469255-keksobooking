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
var NUMBER_OF_ADS = 8;

var MIN_PRICE = {
  flat: 1000,
  bungalo: 0,
  house: 5000,
  palace: 10000
};
var CAPACITY_ROOMS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

var map = document.querySelector('.map');
var template = document.querySelector('template');
var fieldset = document.querySelectorAll('fieldset');
var mapPinMain = map.querySelector('.map__pin--main');
var popupClose;
var address = document.querySelector('#address');

var appartmentType = document.querySelector('#type');
var appartmentPrice = document.querySelector('#price');
var appartmentRoomNumber = document.querySelector('#room_number');
var appartmentCapacity = document.querySelector('#capacity');
var appartmentTimein = document.querySelector('#timein');
var appartmentTimeout = document.querySelector('#timeout');

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

  for (var i = 0; i < NUMBER_OF_ADS; i++) {
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
  var similarMapPin = template.content.querySelector('.map__pin');

  return arr.reduce(function (fragment, advert) {
    var mapPin = similarMapPin.cloneNode(true);

    mapPin.style.left = advert.location.x + 'px';
    mapPin.style.top = advert.location.y + 'px';
    mapPin.querySelector('img').src = advert.author.avatar;
    fragment.appendChild(mapPin);

    return fragment;
  }, document.createDocumentFragment());
};

// Добавление меток на карту города
var buildPinsFragment = function () {
  var mapPins = map.querySelector('.map__pins');

  mapPins.appendChild(getMapPins());
};

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
  var ulPicture = template.content.querySelector('.popup__pictures');

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
  var filtersContainer = map.querySelector('.map__filters-container');

  var allAdverts = adverts.reduce(function (fragment, advert) {
    fragment.appendChild(getMapCard(advert));
    return fragment;
  }, document.createDocumentFragment());

  map.insertBefore(allAdverts, filtersContainer);
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

// Добавление адреса в поле "Адрес"
var setAddress = function (element) {
  address.value = element.offsetLeft + ', ' + element.offsetTop;
};

var disabled = function (value) {
  var options = appartmentCapacity.querySelectorAll('option');

  options.forEach(function (option) {
    option.disabled = !CAPACITY_ROOMS[value].includes(option.value);
  });
};

// Метод активации страницы
var activate = function (evt) {
  removeClass('.map', 'map--faded');
  removeClass('.notice__form', 'notice__form--disabled');
  fieldset.forEach(function (element) {
    element.disabled = false;
  });
  buildPinsFragment();
  addMapPinsEventListeners();
  setAddress(evt.currentTarget);
  mapPinMain.removeEventListener('mouseup', activate);
  disabled(appartmentRoomNumber.value);
};

var onMapCardEscPress = function (evt) {
  if (evt.keyCode === ESC_CLICK) {
    closeMapCard();
  }
};

// Метод открытия карточки
var openMapCard = function (src) {
  var allCards = map.querySelectorAll('.map__card');

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

deactivateFieldset();
setAddress(mapPinMain);
getMapCards();

popupClose = map.querySelectorAll('.popup__close');

mapPinMain.addEventListener('mouseup', activate);

popupClose.forEach(function (close) {
  close.addEventListener('click', closeMapCard);
});

appartmentType.addEventListener('change', function (evt) {
  appartmentPrice.min = MIN_PRICE[evt.currentTarget.value];
  appartmentPrice.value = MIN_PRICE[evt.currentTarget.value];
});

appartmentTimein.addEventListener('change', function (evt) {
  appartmentTimeout.selectedIndex = evt.currentTarget.selectedIndex;
});

appartmentTimeout.addEventListener('change', function (evt) {
  appartmentTimein.selectedIndex = evt.currentTarget.selectedIndex;
});

appartmentRoomNumber.addEventListener('change', function (evt) {
  disabled(evt.currentTarget.value);
});
