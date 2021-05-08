import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';

import { signOut } from '../../../firebase/api';
const AvatarMenu = ({ onNavigate }) => {
  const history = useHistory();
  return (
    <Menu>
      <Menu.Item onClick={() => onNavigate('/')} icon={<HomeOutlined />}>
        Go to landing page
      </Menu.Item>
      <Menu.Item icon={<UserOutlined />} onClick={() => onNavigate('/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item
        onClick={() => signOut().then(() => history.push('/'))}
        icon={<LogoutOutlined />}
      >
        Sign out
      </Menu.Item>
    </Menu>
  );
};

AvatarMenu.propTypes = {
  onNavigate: PropTypes.func,
};

export default AvatarMenu;
