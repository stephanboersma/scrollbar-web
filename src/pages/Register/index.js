import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

import AuthContext from '../../contexts/AuthContext';
import {
  checkIfEmailIsInvited,
  createAccount,
  getStudyLines,
} from '../../firebase/api';
import RegisterForm from '../../styles/molecules/RegisterForm';
import FullWidthPage from '../../styles/templates/FullPage';

const Wrapper = styled(Row)`
  height: 100%;
`;
const Register = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [studylines, setStudylines] = useState();

  useEffect(() => {
    getStudyLines()
      .then((res) => {
        setStudylines(
          res.map((studyline) => {
            return {
              label: `${studyline.prefix} in ${studyline.name}`,
              value: studyline.id,
            };
          })
        );
      })
      .catch((error) => message.error(`An error occurred: ${error.message}`));
  }, [studylines]);

  const register = async (form) => {
    setLoading(true);
    const isInvited = await checkIfEmailIsInvited(form.email);
    if (isInvited && !isInvited.registered) {
      createAccount(form)
        .then((user) => {
          message.success('You have been signed up succesfully');
          setLoading(false);
          setUser(user);
          history.push('/profile');
        })
        .catch((error) => {
          setLoading(false);
          message.error(`An error occurred: ${error.message}`);
        });
    } else {
      setLoading(false);
      message.error(
        'This e-mail has not been invited or an account is already registered to that email'
      );
    }
  };
  return (
    <FullWidthPage>
      <Wrapper center="xs" middle="xs">
        <RegisterForm
          loading={loading}
          onSubmit={register}
          studylines={studylines}
        />
      </Wrapper>
    </FullWidthPage>
  );
};

export default Register;
