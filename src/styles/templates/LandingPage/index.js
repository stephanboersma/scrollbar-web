import { AntDesignOutlined, MenuOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import Layout, { Footer, Header } from 'antd/lib/layout/layout';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import logo from '../../../assets/images/logo.png';
import AuthContext from '../../../contexts/AuthContext';
import AvatarMenu from '../../atoms/AvatarMenu';
import Logo from '../../atoms/Logo';
import { Text } from '../../atoms/Typography';

const MenuItem = styled(Menu.Item)`
  padding: 0 40px !important;
  font-size: 16px;
`;
const UserNameLink = styled(Text)`
  margin: 0 12px 0 0;
  color: #fff;
  @media (max-width: 680px) {
    display: none;
  }
`;

const UserCorner = styled(Space)`
  @media (max-width: 680px) {
    display: none;
  }
`;

const HeaderWrapper = styled(Space)`
  flex-grow: 1;
  @media (max-width: 680px) {
    justify-content: space-between;
  }
`;

const LandingPage = ({ children }) => {
  const { user, authenticated } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Layout
      style={{ display: 'flex', flexDirection: 'column', height: 'auto' }}
    >
      <Header style={{ height: 'auto', display: 'flex', flexDirection: 'row' }}>
        <HeaderWrapper direction="horizontal">
          <Logo style={{ height: '100px', flexGrow: 1 }} src={logo} />
          <Menu
            overflowedIndicator={
              <MenuOutlined style={{ fontSize: '32px', color: '#fff319' }} />
            }
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '132px', flexGrow: '1' }}
          >
            <MenuItem key="3" onClick={() => history.push('/members')}>
              Members Lounge
            </MenuItem>
          </Menu>
        </HeaderWrapper>
        {authenticated && (
          <UserCorner direction="horizontal">
            <UserNameLink>{user.displayName}</UserNameLink>
            <Dropdown
              overlay={<AvatarMenu onNavigate={(path) => history.push(path)} />}
            >
              <Avatar
                style={{ margin: 'auto 0 ' }}
                src={user.photoUrl}
                size={{ xs: 75, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
                icon={<AntDesignOutlined />}
              />
            </Dropdown>
          </UserCorner>
        )}
      </Header>
      {children}
      <Footer style={{ textAlign: 'center' }}>ScrollBar ©2021</Footer>
    </Layout>
  );
};

export default LandingPage;
