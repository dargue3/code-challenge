import themeDefaults from './themeDefaults';

const lightModeTheme = {
  ...themeDefaults,
  colors: {
    white: '#F5F5F7',
    black: '#1D1D1F',
    text: {
      red: 'rgb(255, 55, 61)',
      black: ['#1D1D1F', '#515154', '#6E6E73', '#86868B'],
    },
    fill: {
      black: ['#000000', 'rgb(34, 31, 31)', '#86868B', '#D2D2D7', '#E8E8ED'],
      white: ['#FFFFFF', '#FBFBFD', '#F5F5F7'],
    },
  },
  typefaces: {
    headerSmall: {
      as: 'h5',
      fontSize: 2,
      display: 'block',
      fontWeight: 'semibold',
      letterSpacing: '-0.23px',
      color: 'text.black.0',
    },
    header: {
      as: 'h3',
      fontSize: 4,
      display: 'block',
      fontWeight: 'semibold',
      letterSpacing: '0.31px',
      color: 'text.black.0',
    },
    headerLarge: {
      as: 'h1',
      fontSize: 6,
      display: 'block',
      fontWeight: 'semibold',
      letterSpacing: '0.27px',
      color: 'text.black.0',
    },
    bodySmall: {
      fontSize: 2,
      letterSpacing: '-0.22px',
    },
    caption: {
      fontSize: 1,
      letterSpacing: '-0.12px',
    },
    captionSmall: {
      fontSize: 0,
      fontWeight: 'medium',
      letterSpacing: '-0.09px',
      color: 'text.black.0',
    },
    link: {
      color: 'text.red',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    button: {
      as: 'button',
      color: 'text.blue',
    },
    number: {
      letterSpacing: '-0.12px',
    },
    strikethrough: {
      textDecoration: 'line-through',
    },
    underline: {
      textDecoration: 'underline',
    },
    uppercase: {
      textTransform: 'uppercase',
    },
    italics: {
      fontStyle: 'italic',
    },
  },
};

const darkModeTheme = {
  ...lightModeTheme,
  darkMode: true,
  colors: {
    white: '#F5F5F7',
    black: '#1D1D1F',
    text: {
      red: 'rgb(255, 55, 61)',
      black: ['#F5F5F7', '#A1A1A6', '#86868B', '#6E6E73'],
    },
    fill: {
      black: ['#FFFFFF', '#F5F5F7', '#6E6E73', '#424245', '#333336'],
      white: ['#000000', '#161617', '#1D1D1F'],
    },
  },
};

export { lightModeTheme, darkModeTheme };
