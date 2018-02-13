'use strict';

(function () {
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

  var NUMBER_OF_ADS = 8;

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

  window.data = {
    apartmentType: APARTMENT_TYPE,
    getArr: getArr()
  };
})();
