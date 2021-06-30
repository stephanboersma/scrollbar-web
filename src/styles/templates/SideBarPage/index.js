import {
  AntDesignOutlined,
  CalendarOutlined,
  HomeOutlined,
  ProfileOutlined,
  SettingOutlined,
  TeamOutlined,
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
import AvatarMenu from '../../atoms/AvatarMenu';
import { DEFAULT_AVATAR_URL } from '../../atoms/DefaultAvatarPicture';
import Logo from '../../atoms/Logo';
import { Text, Title } from '../../atoms/Typography';

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
  @media (max-width: 680px) {
    font-size: 18px !important;
  }
`;
const Wrapper = styled(Layout)`
  min-height: 100%;
`;

const UserNameLink = styled(Text)`
  margin: 0 12px 0 0;
  @media (max-width: 680px) {
    display: none;
  }
`;

const SideBarPage = ({ children, title }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const navigateToLink = (location) => history.push(location);

  const hasPermission = (role) => user.roles.includes(role) || user.isAdmin;

  return (
    <Wrapper>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Logo src={logo} onClick={() => history.push('/')} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onSelect={(info) => navigateToLink(info.key)}
        >
          <Menu.Item key="/members/shifts" icon={<HomeOutlined />}>
            Tender site
          </Menu.Item>
          <Menu.Item key="/members/profile" icon={<ProfileOutlined />}>
            Profile
          </Menu.Item>
          {hasPermission('user_manager') && (
            <Menu.Item key="/members/manage/users" icon={<TeamOutlined />}>
              User Management
            </Menu.Item>
          )}
          {hasPermission('event_manager') && (
            <Menu.Item key="/members/manage/events" icon={<CalendarOutlined />}>
              Event Management
            </Menu.Item>
          )}
          {hasPermission('shift_manager') && (
            <Menu.Item key="/members/manage/shifts" icon={<SettingOutlined />}>
              Shift Management
            </Menu.Item>
          )}
          {hasPermission('admin') && (
            <Menu.Item key="/members/settings" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout>
        <StyledHeader>
          <StyledPageTitle level={3}>{title}</StyledPageTitle>
          <UserNameLink>{user.displayName}</UserNameLink>
          <Dropdown
            trigger={['hover', 'click']}
            overlay={<AvatarMenu onNavigate={navigateToLink} />}
          >
            <Avatar
              src={user.photoUrl ? user.photoUrl : DEFAULT_AVATAR_URL}
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
