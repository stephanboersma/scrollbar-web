import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import AuthContext from '../../../contexts/AuthContext';
import { signOut } from '../../../firebase/api';
const AvatarMenu = ({ onNavigate }) => {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  return (
    <Menu>
      <Menu.Item onClick={() => onNavigate('/')} icon={<HomeOutlined />}>
        Go to landing page
      </Menu.Item>
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => onNavigate('/members/profile')}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          signOut().then(() => {
            history.push('/');
            setUser(null);
          })
        }
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
