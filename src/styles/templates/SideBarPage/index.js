import {
  AntDesignOutlined,
  CalendarOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';

import logo from '../../../assets/images/logo.png';
import AuthContext from '../../../contexts/AuthContext';
import { signOut } from '../../../firebase/api';
import { Text, Title } from '../../atoms/Typography';

const Logo = styled.img`
  margin: 16px;
  max-width: 168px;
`;

const StyledContent = styled(Content)`
  margin: 24px 16px 0;
  height: 100%;
`;

const ContentWrap = styled.div`
  padding: 24px;
  background: #fff;
  height: auto;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledPageTitle = styled(Title)`
  margin: 0 !important;
  line-height: inherit !important;
  flex-grow: 1;
`;
const Wrapper = styled(Layout)`
  height: 100%;
`;

const UserNameLink = styled(Text)`
  margin: 0 12px 0 0;
`;

const SideBarPage = ({ children, title }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const navigateToLink = (location) => history.push(location);

  const hasPermission = (role) => user.roles.includes(role) || user.isAdmin;

  const AvatarMenu = (
    <Menu>
      <Menu.Item onClick={() => navigateToLink('/')} icon={<HomeOutlined />}>
        Go to landing page
      </Menu.Item>
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => navigateToLink('/profile')}
      >
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
  if (!user) {
    return <Title level={1}>Loading</Title>;
  }
  return (
    <Wrapper>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Logo src={logo} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onSelect={(info) => navigateToLink(info.key)}
        >
          <Menu.Item key="/members" icon={<HomeOutlined />}>
            {"Member's Portal"}
          </Menu.Item>
          <Menu.Item key="/shifts" icon={<ScheduleOutlined />}>
            Shift plan
          </Menu.Item>
          <Menu.Item key="/profile" icon={<ProfileOutlined />}>
            Profile
          </Menu.Item>
          {hasPermission('user_manager') && (
            <Menu.Item key="/manage/users" icon={<TeamOutlined />}>
              User Management
            </Menu.Item>
          )}
          {hasPermission('event_manager') && (
            <Menu.Item key="/manage/events" icon={<CalendarOutlined />}>
              Event Management
            </Menu.Item>
          )}
          {hasPermission('shift_manager') && (
            <Menu.Item key="/manage/shifts" icon={<SettingOutlined />}>
              Shift Management
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout>
        <StyledHeader>
          <StyledPageTitle level={3}>{title}</StyledPageTitle>
          <UserNameLink>{user.displayName}</UserNameLink>
          <Dropdown overlay={AvatarMenu}>
            <Avatar
              src={user.photoUrl}
              size="large"
              icon={<AntDesignOutlined />}
            />
          </Dropdown>
        </StyledHeader>
        <StyledContent>
          <ContentWrap>{children}</ContentWrap>
        </StyledContent>
      </Layout>
    </Wrapper>
  );
};

SideBarPage.propTypes = {
  title: PropTypes.string,
};

export default SideBarPage;
