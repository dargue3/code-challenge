import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { lightModeTheme } from '../../styles/theme';

function AppProviders({ children }) {
  return <ThemeProvider theme={lightModeTheme}>{children}</ThemeProvider>;
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
