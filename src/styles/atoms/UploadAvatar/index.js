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
const UploadAvatar = ({ tender, onUpdatePhoto }) => {
  const [file, setFile] = useState([]);
  const handleUpload = (e) => {
    setFile(e.file.originFileObj);
  };

  return (
    <StyledUpload
      name="avatar"
      customRequest={() => {
        uploadProfilePicture(file, tender.email).then(onUpdatePhoto);
      }}
      showUploadList={false}
      onChange={handleUpload}
    >
      <Avatar
        src={tender.photoUrl}
        size={{ xs: 75, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
        icon={<PlusOutlined />}
      />
    </StyledUpload>
  );
};

UploadAvatar.propTypes = {
  tender: PropTypes.any,
  onUpdatePhoto: PropTypes.func,
};
export default UploadAvatar;
