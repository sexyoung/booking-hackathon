// export const stylers = [
//   {
//     'stylers': [
//       { 'hue': '#00ffe6' },
//       { 'saturation': -20 }
//     ]
//   }, {
//     'featureType': 'road',
//     'elementType': 'geometry',
//     'stylers': [
//       { 'lightness': 100 },
//       { 'visibility': 'simplified' }
//     ]
//   }, {
//     'featureType': 'road',
//     'elementType': 'labels',
//     'stylers': [
//       { 'visibility': 'on' }
//     ]
//   }
// ];

export const stylers = [
  {
    'featureType': 'all',
    'stylers': [
      { 'saturation': -60 }
    ]
  }
];

// export const gradient = [
//   'rgba(0, 255, 255, 0)',
//   'rgba(0, 255, 255, 1)',
//   'rgba(0, 191, 255, 1)',
//   'rgba(0, 127, 255, 1)',
//   'rgba(0, 63, 255, 1)',
//   'rgba(0, 0, 255, 1)',
//   'rgba(0, 0, 223, 1)',
//   'rgba(0, 0, 191, 1)',
//   'rgba(0, 0, 159, 1)',
//   'rgba(0, 0, 127, 1)',
//   'rgba(63, 0, 91, 1)',
//   'rgba(127, 0, 63, 1)',
//   'rgba(191, 0, 31, 1)',
//   'rgba(255, 0, 0, 1)'
// ];

export const gradient = [
  'rgba(254, 187, 2, 0.1)',
  '#FEBB02',
  '#FEC102',
  '#FEC702',
  '#FECE01',
  '#FED401',
  '#FEDA01',
  '#FFE001',
  '#FFE601',
  '#FFEC01',
  '#FFF300',
  '#FFF900',
  '#FFFF00'
];

// export const gradient = [
//   'rgba(0, 53, 128, 0)',
//   '#003580',
//   '#00478C',
//   '#005A97',
//   '#006CA3',
//   '#007EAE',
//   '#0091BA',
//   '#00A3C5',
//   '#00B6D1',
//   '#00C8DC',
//   '#00DAE8',
//   '#00EDF3',
//   '#00FFFF'
// ];

export default {
  stylers,
  gradient,
};
