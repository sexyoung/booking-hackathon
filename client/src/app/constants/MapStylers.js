export const stylers = [
  {
    'stylers': [
      { 'hue': '#00ffe6' },
      { 'saturation': -20 }
    ]
  }, {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      { 'lightness': 100 },
      { 'visibility': 'simplified' }
    ]
  }, {
    'featureType': 'road',
    'elementType': 'labels',
    'stylers': [
      { 'visibility': 'on' }
    ]
  }
];

export const gradient = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 0, 223, 1)',
  'rgba(0, 0, 191, 1)',
  'rgba(0, 0, 159, 1)',
  'rgba(0, 0, 127, 1)',
  'rgba(63, 0, 91, 1)',
  'rgba(127, 0, 63, 1)',
  'rgba(191, 0, 31, 1)',
  'rgba(255, 0, 0, 1)'
];

export default {
  stylers,
  gradient,
};
