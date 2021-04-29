import React from 'react';
import { Grid } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  height: 100%;
  width: 100%;
`;
const FullWidthPage = ({ children }) => {
  return <StyledGrid>{children}</StyledGrid>;
};

export default FullWidthPage;
