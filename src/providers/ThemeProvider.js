import React from 'react';
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
const THEME = {
  primary: 'fff319',
  secondary: '#001529',
  bg: '#171717',
  baseUnit: 12,
};
const GlobalStyle = createGlobalStyle`
#root {
  height: 100vh;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {
  background-color: #171717;
}
.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
  background-color: #171717;
  color: #ff3139
}
@media only screen and (min-width: 1170px) {
  .vertical-timeline.vertical-timeline--two-columns:before {
  left: 49.5%;
  }

}
.vertical-timeline::before {
  left: 24px;
}
.ant-typography-expand, .ant-typography-edit, .ant-typography-copy {
  color: orange;
}

`;

const ThemeProvider = ({ children }) => {
  return (
    <StyledThemeProvider theme={THEME}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
