import 'react-vertical-timeline-component/style.min.css';

import {
  AntDesignOutlined,
  CalendarOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';
import { Button, Col, Divider, Row, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { Content } from 'antd/lib/layout/layout';
import moment from 'moment';
import React, { useContext } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import styled from 'styled-components';

import AuthContext from '../../contexts/AuthContext';
import EventContext from '../../contexts/EventContext';
import TendersContext from '../../contexts/TendersContext';
import { DEFAULT_AVATAR_URL } from '../../styles/atoms/DefaultAvatarPicture';
import { Paragraph, Text, Title } from '../../styles/atoms/Typography';
import LandingPage from '../../styles/templates/LandingPage';

const NextEvent = styled(Row)`
  padding: 0 24px;
  @media (max-width: 991px) {
    padding: 0;
  }
`;

const StyledTimelineElement = styled(VerticalTimelineElement)`
  .vertical-timeline-element-icon svg {
    margin: inherit;
    left: inherit;
    top: inherit;
    display: inline-block;
  }
`;

const { Markdown } = MDEditor;

const Landing = () => {
  const { eventState } = useContext(EventContext);
  const { tenderState } = useContext(TendersContext);
  const { studylines, settings } = useContext(AuthContext);

  const getStudyline = (id) => {
    if (studylines.length) {
      return studylines.filter((_studyline) => _studyline.id === id)[0];
    }
    return { abbreviation: 'loading' };
  };

  return (
    <LandingPage>
      <div
        style={{
          backgroundImage: `url(${settings ? settings.hero : ''})`,
          backgroundColor: '#171717',
          backgroundRepeat: 'no-repeat no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          minHeight: '40vh',
          maxHeight: '40vh',
          marginTop: '132px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        />

        <NextEvent justify="end">
          <Col
            md={24}
            lg={8}
            style={{
              width: '100%',
              position: 'absolute',
              bottom: '24px',
              zIndex: 2,
              background: 'rgba(255, 243, 25, 0.8)',
              padding: '24px',
            }}
          >
            <div style={{ paddingRight: '12px' }}>
              {eventState.events.filter((_event) => _event.published).length >
              0 ? (
                <>
                  <Title level={4}>See you at our next event!</Title>
                  <Title level={5}>
                    {
                      eventState.events.filter((_event) => _event.published)[0]
                        .displayName
                    }{' '}
                    @{' '}
                    {moment(eventState.events[0].start.toDate())
                      .format('DD-MM-YYYY HH:mm')
                      .toString()}
                  </Title>
                </>
              ) : (
                <>
                  <Title level={4}>We currently have no events planned</Title>
                  <Title level={5}>
                    ... but rest assured. We will be back!
                  </Title>
                </>
              )}
            </div>
          </Col>
        </NextEvent>
      </div>

      <Content
        style={{
          padding: '50px',
          height: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
        }}
      >
        <Row justify="center">
          <Col
            md={24}
            lg={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Title id="about" level={2} style={{ scrollMarginTop: '135px' }}>
              What is ScrollBar?
            </Title>
            <Paragraph style={{ fontSize: '18px', lineHeight: '36px' }}>
              ScrollBar is a study-bar driven by the volunteer-organisation
              ScrollBar, founded in 2004, that aims to bring together students
              from ITU in a cozy atmosphere. ScrollBar is open every Friday
              within the semester from 3 PM - 2 AM. We regularly have DJs
              playing, we have a myriad of different events throughout the
              semester (Birthday parties, Back-To-School party aswell as
              Beer-pong tournaments). Were truly proud of our beer-assortment.
              That aside we serve the usual suspects of drinks. We just covered
              the ScrollBar-basics here, but if you are truly curious, you can
              find ScrollBars current constitution here
            </Paragraph>
          </Col>
        </Row>
        {settings && settings.openForSignups && <Divider />}
        {settings && settings.openForSignups && (
          <Row justify="center">
            <Col
              md={24}
              lg={12}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Title
                id="join_scrollbar"
                level={2}
                style={{ scrollMarginTop: '135px' }}
              >
                {settings.joinScrollBarTitle}
              </Title>
              <Markdown
                className="ant-typohraphy"
                style={{ fontSize: '18px', lineHeight: '36px' }}
                source={settings.joinScrollBarText}
              />
              <Button
                type="primary"
                size="large"
                href={settings.joinScrollBarLink}
                target="_blank"
              >
                Apply now!
              </Button>
            </Col>
          </Row>
        )}

        <Divider />
        <Row justify="center">
          <Col
            lg={18}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Title
              level={2}
              style={{ scrollMarginTop: '135px' }}
              id="volunteers"
            >
              The volunteers behind
            </Title>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'space-around' }}
              size={16}
              wrap
            >
              {studylines.length > 0 && !tenderState.loading ? (
                tenderState.tenders
                  .filter(
                    (_tender) =>
                      !_tender.roles.includes('passive') &&
                      _tender.roles.length != 0
                  )
                  .map((each, i) => {
                    return (
                      <Space direction="vertical" align="center" key={i}>
                        <Avatar
                          src={
                            each.photoUrl ? each.photoUrl : DEFAULT_AVATAR_URL
                          }
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
                        <Text>{each.displayName}</Text>
                        <Text type="secondary">
                          {getStudyline(
                            each.studyline
                          ).abbreviation.toUpperCase()}
                        </Text>
                      </Space>
                    );
                  })
              ) : (
                <LoadingOutlined style={{ fontSize: '100px' }} spin />
              )}
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col
            span={24}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '60px 0',
            }}
          >
            <Title id="future_events" style={{ scrollMarginTop: '135px' }}>
              Future events
            </Title>

            {eventState.events.filter((_event) => _event.published).length >
            0 ? (
              <VerticalTimeline style={{ width: '100%' }}>
                {eventState.events
                  .filter((_event) => _event.published)
                  .map((each, i) => {
                    return (
                      <StyledTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{
                          background: '#fff319',
                          color: '#171717',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          width: '50px',
                          height: '50px',
                        }}
                        icon={<CalendarOutlined size={24} />}
                        date={moment(each.start.toDate())
                          .format('DD-MM-YYYY HH:mm')
                          .toString()}
                        key={i}
                      >
                        <Title
                          level={5}
                          className="vertical-timeline-element-title"
                        >
                          {each.displayName}
                        </Title>
                      </StyledTimelineElement>
                    );
                  })}
              </VerticalTimeline>
            ) : (
              <Text type="secondary">
                We will be back shortly with awesome events!
              </Text>
            )}
          </Col>
        </Row>
      </Content>
    </LandingPage>
  );
};

/* 
import PropTypes from 'prop-types';
Landing.propTypes = {

} 
*/
export default Landing;
