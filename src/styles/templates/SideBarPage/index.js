import {
  AntDesignOutlined,
  DownOutlined,
  HomeOutlined,
  ScheduleOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';

import logo from '../../../assets/images/logo.png';
import { Title } from '../../atoms/Typography';

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
  line-height: inherit !important;
  flex-grow: 1;
`;
const Wrapper = styled(Layout)`
  height: 100%;
`;

const SideBarPage = ({ children, title }) => {
  const history = useHistory();
  const location = useLocation();
  const navigateToLink = (location) =>
    location ? history.push(location) : null;
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
        onClick={() => console.log('sign out')}
        icon={<DownOutlined />}
      >
        Sign out
      </Menu.Item>
    </Menu>
  );
  return (
    <Wrapper>
      <Sider>
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
          <Menu.Item key="/shift_plan" icon={<ScheduleOutlined />}>
            Shift plan
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="/administration" icon={<SmileOutlined />}>
            Admin
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <StyledHeader>
          <StyledPageTitle level={3}>{title}</StyledPageTitle>
          <Dropdown overlay={AvatarMenu}>
            <Avatar
              src="https://scontent-cph2-1.xx.fbcdn.net/v/t1.6435-9/72338822_10221485736317419_5282220620531105792_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=jxA0sXQHWMEAX83XnaZ&_nc_ht=scontent-cph2-1.xx&oh=630a23c4684d129db083ff736c2ccd00&oe=60B0112A"
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
