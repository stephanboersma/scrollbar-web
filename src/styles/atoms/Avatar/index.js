import { AntDesignOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import AuthContext from '../../../contexts/AuthContext';
import { Text } from '../Typography';

const TenderAvatar = ({
  tender,
  onClick,
  manage,
  isUpForGrabs,
  setUpForGrabs,
  takeShift,
}) => {
  const { user } = useContext(AuthContext);

  const getButton = () => {
    if (manage) return;

    if (tender.id === user.id) {
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
      return isUpForGrabs ? (
        <Button type="primary" onClick={() => takeShift(user)}>
          Grab shift
        </Button>
      ) : null;
    }
  };
  if (!tender) {
    return <LoadingOutlined spin />;
  }
  return (
    <Space style={{ cursor: 'pointer' }} direction="vertical" align="center">
      <Avatar
        onClick={onClick}
        src={tender.photoUrl}
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
};
export default TenderAvatar;
