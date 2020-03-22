const FONT_SIZES = [
  '0.624rem', // 10px -  0
  '0.702rem', // 11px -  1
  '0.889rem', // 14px -  2
  '1.000rem', // 16px -  3
  '1.125rem', // 18px -  4
  '1.602rem', // 26px -  5
  '1.802rem', // 29px -  6
  '2.027rem', // 32px -  7
  '2.281rem', // 36px -  8
  '2.566rem', // 41px -  9
  '2.887rem', // 46px - 10
  '3.247rem', // 52px - 11
  '3.653rem', // 58px - 12
  '4.110rem', // 66px - 13
  '4.624rem', // 74px - 14
];

const LINE_HEIGHTS = [
  '1.5rem', // 0
  '1.5rem', // 1
  '1.5rem', // 2
  '1.5rem', // 3
  '1.5rem', // 4
  '3.0rem', // 5
  '3.0rem', // 6
  '3.0rem', // 7
  '3.0rem', // 8
  '3.0rem', // 9
  '3.0rem', // 10
  '4.5rem', // 11
  '4.5rem', // 12
  '4.5rem', // 13
  '6.0rem', // 14
];

// follows a scale from a popular CSS framework
// https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
const SPACE = {
  '0': '0px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
  '32': '128px',
};

const DEFAULTS = {
  space: SPACE,
  fontSizes: FONT_SIZES,
  lineHeights: LINE_HEIGHTS,
  darkMode: false,
  colors: {
    error: '#E30000',
  },
  breakpoints: ['735px', '1068px', '1441px'],
  fonts: {
    body: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica',
    header: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica',
    number: 'SF Mono, Consolas, Liberation Mono, Menlo, Courier, monospace',
  },
  fontWeights: {
    thin: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  typefaces: {},
};

export default DEFAULTS;
