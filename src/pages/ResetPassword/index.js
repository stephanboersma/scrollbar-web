import { message } from 'antd';
import React from 'react';
import { Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

import { sendResetPasswordEmail } from '../../firebase/api';
import ResetPasswordForm from '../../styles/molecules/ResetPassword';
import FullWidthPage from '../../styles/templates/FullPage';

const Wrapper = styled(Row)`
  height: 100%;
`;
const ResetPassword = () => {
  const resetPassword = (form) => {
    console.log(form);
    sendResetPasswordEmail(form)
      .then(() => message.success('An e-mail has been sent'))
      .catch((error) => message.error('An error occurred: ' + error.message));
  };
  return (
    <FullWidthPage>
      <Wrapper center="xs" middle="xs">
        <ResetPasswordForm onSubmit={resetPassword} />
      </Wrapper>
    </FullWidthPage>
  );
};

/* 
import PropTypes from 'prop-types';
Login.propTypes = {

} 
*/
export default ResetPassword;
