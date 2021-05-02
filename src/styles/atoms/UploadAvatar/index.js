import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { uploadProfilePicture } from '../../../firebase/api';

const StyledUpload = styled(Upload)`
  width: fit-content;
  cursor: pointer;
`;
const UploadAvatar = ({ user, onUpdatePhoto }) => {
  const [file, setFile] = useState([]);
  const handleUpload = (e) => {
    setFile(e.file.originFileObj);
  };

  return (
    <StyledUpload
      name="avatar"
      customRequest={() => {
        uploadProfilePicture(file, user.email).then(onUpdatePhoto);
      }}
      showUploadList={false}
      onChange={handleUpload}
    >
      <Avatar src={user.photoUrl} size={100} icon={<PlusOutlined />} />
    </StyledUpload>
  );
};

UploadAvatar.propTypes = {
  user: PropTypes.any,
  onUpdatePhoto: PropTypes.func,
};
export default UploadAvatar;
