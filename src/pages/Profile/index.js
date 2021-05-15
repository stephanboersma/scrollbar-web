import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useContext } from 'react';

import AuthContext from '../../contexts/AuthContext';
import TendersContext from '../../contexts/TendersContext';
import ProfileInfo from '../../styles/molecules/ProfileInfo';
import SideBarPage from '../../styles/templates/SideBarPage';

const Profile = () => {
  const { user, setUser, studylines } = useContext(AuthContext);
  const { updateTender } = useContext(TendersContext);

  const updateProfile = (field, value) => {
    updateTender(user.id, field, value)
      .then(() => {
        if (field === 'studyline') {
          setUser({
            ...user,
            studyline: studylines.filter(
              (studyline) => studyline.id === value
            )[0],
          });
        } else {
          setUser({ ...user, [field]: value });
        }
      })
      .catch((error) => message.error('An error occurred ' + error.message));
  };
  if (!user || studylines.length === 0) {
    return <LoadingOutlined style={{ fontSize: '100px' }} spin />;
  }

  return (
    <SideBarPage title="Profile">
      <ProfileInfo tender={user} updateProfile={updateProfile} />
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
Profile.propTypes = {

} 
*/
export default Profile;
