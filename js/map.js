'use strict';

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatar = function (avatarNumber) {
  return 'img/avatars/user0' + (avatarNumber + 1) + '.png';
};

var getRandomTitle = function (index) {
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  return titles[index];
};

var getRandomType = function () {
  var types = ['flat', 'house', 'bungalo'];

  return types[getRandomNumber(0, 2)];
};

var getFeatures = function () {
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var features = [];
  var featuresAmount = getRandomNumber(0, 6);

  for (var i = 0; i < featuresAmount; i++) {
    var randomIndex = getRandomNumber(0, featuresList.length - 1);

    features.push(featuresList[randomIndex]);
    featuresList.splice(randomIndex, 1);
  }

  return features;
};

var getArr = function () {
  var arr = [];

  for (var i = 0; i < 8; i++) {
    var xCoordinate = getRandomNumber(300, 900);
    var yCoordinate = getRandomNumber(150, 500);

    arr.push({
      author: {
        avatar: getAvatar(i)
      },
      offer: {
        title: getRandomTitle(i),
        address: xCoordinate + ', ' + yCoordinate,
        price: getRandomNumber(1000, 1000000),
        type: getRandomType(),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 40),
        checkin: getRandomNumber(12, 14) + ':00',
        checkout: getRandomNumber(12, 14) + ':00',
        features: getFeatures(),
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

var removeClass = function (selector, className) {
  var node = document.querySelector(selector);

  node.classList.remove(className);
};

removeClass('.map', 'map--faded');

var getMapPins = function () {
  var arr = getArr();
  var template = document.querySelector('template');
  var similarMapPin = template.content.querySelector('.map__pin');
  var mapPinsFragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    var mapPin = similarMapPin.cloneNode(true);

    mapPin.style.left = arr[i].location.x + 'px';
    mapPin.style.top = arr[i].location.y + 'px';
    mapPin.querySelector('img').src = arr[i].author.avatar;

    mapPinsFragment.appendChild(mapPin);
  }

  return mapPinsFragment;
};

var buildPinsFragment = function () {
  var mapPins = document.querySelector('.map__pins');

  mapPins.appendChild(getMapPins());
};

buildPinsFragment();

var getApartmentType = function (type) {
  var apartmentType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  return apartmentType[type];
};

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

var getMapCard = function () {
  var arr = getArr();
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var template = document.querySelector('template');
  var similarMapCard = template.content.querySelector('.map__card');
  var mapCard = similarMapCard.cloneNode(true);
  var allP = mapCard.querySelectorAll('p');

  mapCard.querySelector('h3').textContent = arr[0].offer.title;
  mapCard.querySelector('small').textContent = arr[0].offer.address;
  mapCard.querySelector('.popup__price').textContent = arr[0].offer.price + ' \u20BD' + '/ночь';
  mapCard.querySelector('h4').textContent = getApartmentType(arr[0].offer.type);
  allP[2].textContent = arr[0].offer.rooms + ' комнаты для ' + arr[0].offer.guests + ' гостей';
  allP[3].textContent = 'Заезд после ' + arr[0].offer.checkin + ', выезд до ' + arr[0].offer.checkout;
  mapCard.querySelector('.popup__features').innerHTML = '';
  mapCard.querySelector('.popup__features').appendChild(mapFeaturesToDom(arr[0].offer.features));
  allP[4].textContent = arr[0].offer.description;
  mapCard.querySelector('.popup_avatar').src = arr[0].author.avatar;

  map.insertBefore(mapCard, filtersContainer);
};

getMapCard();
