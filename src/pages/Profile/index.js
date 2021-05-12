import { message } from 'antd';
import React, { useContext } from 'react';

import AuthContext from '../../contexts/AuthContext';
import { updateUser } from '../../firebase/api';
import ProfileInfo from '../../styles/molecules/ProfileInfo';
import SideBarPage from '../../styles/templates/SideBarPage';

const Profile = () => {
  const { user, setUser, studylines } = useContext(AuthContext);

  const updateProfile = (field, value) => {
    updateUser({ id: user.id, field: field, value: value })
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

  return (
    <SideBarPage title="Profile">
      <ProfileInfo
        user={user}
        studylines={studylines}
        updateProfile={updateProfile}
      />
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
Profile.propTypes = {

} 
*/
export default Profile;
