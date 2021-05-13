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

.vertical-timeline-element-icon svg {
  margin: 0 !important;
  left: 0 !important;
  right: 0 !important;
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
