import { AntDesignOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import AuthContext from '../../../contexts/AuthContext';
import { DEFAULT_AVATAR_URL } from '../DefaultAvatarPicture';
import { Text } from '../Typography';

const TenderAvatar = ({
  tender,
  onClick,
  manage,
  isUpForGrabs,
  setUpForGrabs,
  takeShift,
  isPast,
}) => {
  const { user } = useContext(AuthContext);

  const getButton = () => {
    if (manage) return;

    if (tender.id === user.id && !isPast) {
      return isUpForGrabs ? (
        <Button type="primary" onClick={() => setUpForGrabs(false)}>
          I want this shift anyway
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            setUpForGrabs(true);
          }}
        >
          Put up for grabs
        </Button>
      );
    } else {
      return isUpForGrabs && !isPast ? (
        <Button type="primary" onClick={() => takeShift(user)}>
          Grab shift
        </Button>
      ) : null;
    }
  };

  return (
    <Space style={{ cursor: 'pointer' }} direction="vertical" align="center">
      <Avatar
        onClick={onClick}
        src={tender.photoUrl ? tender.photoUrl : DEFAULT_AVATAR_URL}
        size="large"
        icon={<AntDesignOutlined />}
      />
      <Text>{tender.displayName}</Text>
      {getButton()}
    </Space>
  );
};
TenderAvatar.propTypes = {
  tender: PropTypes.any,
  onClick: PropTypes.func,
  manage: PropTypes.bool,
  isUpForGrabs: PropTypes.bool,
  setUpForGrabs: PropTypes.func,
  takeShift: PropTypes.func,
  isPast: PropTypes.bool,
};
export default TenderAvatar;
