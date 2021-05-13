import { message } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

import { loginWithEmailAndPassword } from '../../firebase/api';
import LoginForm from '../../styles/molecules/LoginForm';
import FullWidthPage from '../../styles/templates/FullPage';

const Wrapper = styled(Row)`
  height: 100%;
`;
const Login = () => {
  const history = useHistory();

  const login = ({ email, password }) => {
    loginWithEmailAndPassword(email, password)
      .then(() => {
        history.push(`/members/profile`);
      })
      .catch((error) => message.error('An error occurred: ' + error.message));
  };
  return (
    <FullWidthPage>
      <Wrapper center="xs" middle="xs">
        <LoginForm onSubmit={login} />
      </Wrapper>
    </FullWidthPage>
  );
};

/* 
import PropTypes from 'prop-types';
Login.propTypes = {

} 
*/
export default Login;
