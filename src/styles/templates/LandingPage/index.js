import {
  AntDesignOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Avatar, Col, Dropdown, Menu, Row, Space } from 'antd';
import Layout, { Footer, Header } from 'antd/lib/layout/layout';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import logo from '../../../assets/images/logo.png';
import AuthContext from '../../../contexts/AuthContext';
import AvatarMenu from '../../atoms/AvatarMenu';
import Logo from '../../atoms/Logo';
import { Link, Paragraph, Text, Title } from '../../atoms/Typography';

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
  align-self: flex-end;
  margin: auto 0;
  @media (max-width: 680px) {
    display: none;
  }
  @media (min-width: 680px) {
    padding-right: 50px;
  }
`;

const HeaderWrapper = styled(Space)`
  flex-grow: 1;
  @media (max-width: 680px) {
    justify-content: space-between;
  }
  @media (min-width: 680px) {
    padding-left: 50px;
  }
`;

const StyledFooter = styled(Footer)`
  background: #171717;
`;

const FooterText = styled(Text)`
  color: white;
`;

const LandingPage = ({ children }) => {
  const { user, authenticated, settings } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Layout
      style={{ display: 'flex', flexDirection: 'column', height: 'auto' }}
    >
      <Header
        style={{
          height: 'auto',
          display: 'flex',
          flexDirection: 'row',
          padding: '0',
          position: 'fixed',
          width: '100%',
          zIndex: 3,
        }}
      >
        <HeaderWrapper direction="horizontal">
          <Logo
            style={{ height: '100px', flexGrow: 1 }}
            src={logo}
            onClick={() => history.push('/')}
          />
          <Menu
            overflowedIndicator={
              <MenuOutlined style={{ fontSize: '32px', color: '#fff319' }} />
            }
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '132px', flex: '1' }}
          >
            <MenuItem key="1">
              <Link href="#about">About Scrollbar</Link>
            </MenuItem>
            {settings && settings.openForSignups && (
              <MenuItem key="2">
                <Link href="#join_scrollbar">Join Scrollbar</Link>
              </MenuItem>
            )}

            <MenuItem key="3">
              <Link href="#volunteers"> Our volunteers</Link>
            </MenuItem>
            <MenuItem key="4">
              <Link href="#future_events">Future events</Link>
            </MenuItem>
            <MenuItem key="5" onClick={() => history.push('/members/shifts')}>
              Tender site
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
                size={{
                  xs: 75,
                  sm: 100,
                  md: 100,
                  lg: 100,
                  xl: 100,
                  xxl: 100,
                }}
                icon={<AntDesignOutlined />}
              />
            </Dropdown>
          </UserCorner>
        )}
      </Header>
      {children}
      <StyledFooter>
        <Row
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
          style={{ marginBottom: '24px' }}
        >
          <Col lg={6} md={6} sm={24} xs={24}>
            <Logo
              style={{ height: '100px', flexGrow: 1 }}
              src={logo}
              onClick={() => history.push('/')}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <Title level={4} style={{ color: 'white' }}>
              Address
            </Title>
            <Paragraph>
              <FooterText>ScrollBar</FooterText>
            </Paragraph>
            <Paragraph>
              <FooterText>IT University of Copenhagen</FooterText>
            </Paragraph>
            <Paragraph>
              <FooterText>Rued Langaards Vej 7</FooterText>
            </Paragraph>
            <FooterText>2300 København S</FooterText>
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <Title level={4} style={{ color: 'white' }}>
              Contact
            </Title>
            <Paragraph>
              <FooterText>board@scrollbar.dk</FooterText>
            </Paragraph>
            <Paragraph>
              <FooterText>CVR: 28235283</FooterText>
            </Paragraph>
            <Space direction="horizontal">
              <Link href="https://www.facebook.com/ScrollBar/">
                <FacebookOutlined style={{ fontSize: '48px' }} />
              </Link>
              <Link href="https://www.instagram.com/scrollbaritu/">
                <InstagramOutlined style={{ fontSize: '48px' }} />
              </Link>
              <Link href="https://www.linkedin.com/company/scrollbaritu/">
                <LinkedinOutlined style={{ fontSize: '48px' }} />
              </Link>
            </Space>
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <Title level={4} style={{ color: 'white' }}>
              Legal
            </Title>
            <Paragraph>
              <FooterText>
                {settings && (
                  <Link href={settings.constitution} target="_blank">
                    Constitution
                  </Link>
                )}
              </FooterText>
            </Paragraph>
            <Paragraph>
              <FooterText>
                {settings && (
                  <Link href={settings.minutes} target="_blank">
                    Minutes from General Assembly
                  </Link>
                )}
              </FooterText>
            </Paragraph>
          </Col>
        </Row>
        <Row justify="center" style={{ padding: '12px 0' }}>
          <Col>
            <FooterText>
              ScrollBar © {new Date(Date.now()).getFullYear().toString()}
            </FooterText>
          </Col>
        </Row>
      </StyledFooter>
    </Layout>
  );
};

export default LandingPage;
