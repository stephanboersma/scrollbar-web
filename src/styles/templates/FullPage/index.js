import React from 'react';
import { Grid } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  width: 100%;
  min-height: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.bg};
`;
const FullWidthPage = ({ children }) => {
  return <StyledGrid>{children}</StyledGrid>;
};

export default FullWidthPage;
