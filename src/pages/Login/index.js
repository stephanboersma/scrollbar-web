import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

import AuthContext from '../../contexts/AuthContext';
import { loginWithEmailAndPassword } from '../../firebase/api';
import LoginForm from '../../styles/molecules/LoginForm';
import FullWidthPage from '../../styles/templates/FullPage';

const Wrapper = styled(Row)`
  height: 100%;
`;
const Login = () => {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const login = ({ email, password }) => {
    loginWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res);
        console.log('logged in successfully', res);
        history.push(`/members`);
      })
      .catch((error) => console.log(error));
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
