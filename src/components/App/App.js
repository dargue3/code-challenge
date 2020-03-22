import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GlobalStyles from '../../styles/GlobalStyles';
import { Flex } from '../blocks';
import NetflixLogo from '../NetflixLogo';

const StyledNav = styled.nav`
  top: 0;
  width: 100%;
  z-index: 900;
  height: 80px;
  display: flex;
  padding: 0 42px;
  position: sticky;
  align-items: center;
  background: ${p => p.theme.colors.fill.white[0]};
`;

function Nav() {
  return (
    <StyledNav>
      <Link to="/">
        <NetflixLogo />
      </Link>
    </StyledNav>
  );
}

function App({ children }) {
  return (
    <>
      <GlobalStyles />
      <Flex column>
        <Nav />
        {children}
      </Flex>
    </>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
