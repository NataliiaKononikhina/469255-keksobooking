'use strict';

var map = document.querySelector('.map');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomAvatar = function (avatarNumber) {
  return 'img/avatars/user0' + avatarNumber + '.png';
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

  for (var i = 0; i > getRandomNumber(0, 6); i++) {
    features.push(featuresList[getRandomNumber(0, 5)]);
  }

  return features;
};

var getArr = function () {
  var arr = [];

  for (var i = 0; i < 8; i++) {
    arr.push({
      author: {
        avatar: getRandomAvatar(i)
      },
      offer: {
        title: getRandomTitle(i),
        address: this.location.x + ', ' + this.location.y,
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
        x: getRandomNumber(300, 900),
        y: getRandomNumber(150, 500)
      }
    });
  }
};

map.classList.remove('map--faded');
