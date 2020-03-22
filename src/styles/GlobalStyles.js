import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.32;
    color: rgb(34, 31, 31);
    background-color: rgb(245, 245, 241);
    font-family: NetflixSans, Gotham, "“Helvetica Neue”", Helvetica, Arial, sans-serif;
  }

  h1, h2, h3, h4, h5 {
    margin: 0;
    font-weight: 600;
    line-height: 1.32;
    color: rgb(34, 31, 31);
    font-family: NetflixSans, Gotham, "“Helvetica Neue”", Helvetica, Arial, sans-serif;
  }

  h1 {
    font-size: 2rem;
  }

  a {
    text-decoration: none;
    &:hover {
      span {
        text-decoration: underline;
      }
    }
  }

  .flex {
    display: flex;
    &.column {
      flex-direction: column;
    }
    &.space-between {
      justify-content: space-between;
    }
  }

  .ReactVirtualized__Grid {
    &:focus {
      outline: none;
    }
  }
`;
