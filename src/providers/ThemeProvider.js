import React from 'react';
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
const THEME = {
  primary: '#00D8FF',
  secondary: '#001529',
  baseUnit: 12,
};
const GlobalStyle = createGlobalStyle`
#root {
  height: 100vh;
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
