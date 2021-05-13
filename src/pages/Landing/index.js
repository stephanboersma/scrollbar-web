import 'react-vertical-timeline-component/style.min.css';

import {
  AntDesignOutlined,
  CalendarOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Col, Divider, Row, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { Content } from 'antd/lib/layout/layout';
import moment from 'moment';
import React, { useContext } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import styled from 'styled-components';

import hero from '../../assets/images/hero.jpg';
import AuthContext from '../../contexts/AuthContext';
import EventContext from '../../contexts/EventContext';
import TendersContext from '../../contexts/TendersContext';
import { Paragraph, Text, Title } from '../../styles/atoms/Typography';
import LandingPage from '../../styles/templates/LandingPage';

const NextEvent = styled(Row)`
  padding: 0 24px;
  @media (max-width: 991px) {
    padding: 0;
  }
`;

const Landing = () => {
  const { eventState } = useContext(EventContext);
  const { tenderState } = useContext(TendersContext);
  const { studylines } = useContext(AuthContext);

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
          background: `url(${hero})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          minHeight: '40vh',
          maxHeight: '40vh',
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

        {eventState.events.length > 1 && (
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
              <Title level={4}>See you next time!</Title>

              <div style={{ paddingRight: '12px' }}>
                <Title level={5}>
                  {eventState.events[0].displayName} @{' '}
                  {moment(eventState.events[0].start.toDate())
                    .format('DD-MM-YYYY HH:mm')
                    .toString()}
                </Title>
              </div>
            </Col>
          </NextEvent>
        )}
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
            <Title id="about" level={2}>
              About ScrollBar
            </Title>
            <Paragraph>
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
        <Divider />
        <Row justify="center">
          <Col
            md={24}
            lg={20}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Title level={2}>The volunteers behind</Title>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'space-evenly' }}
              size={16}
              wrap
            >
              {studylines.length > 0 && !tenderState.loading ? (
                tenderState.tenders
                  .filter((_tender) => !_tender.roles.includes('passive'))
                  .map((each, i) => {
                    return (
                      <Space direction="vertical" align="center" key={i}>
                        <Avatar
                          src={each.photoUrl}
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
                <LoadingOutlined spin />
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
            <Title id="future_events">Future events</Title>

            {eventState.events.filter((_event) => _event.published).length >
            0 ? (
              <VerticalTimeline style={{ width: '100%' }}>
                {eventState.events.map((each, i) => {
                  return (
                    <VerticalTimelineElement
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
                      icon={
                        <CalendarOutlined
                          size={24}
                          style={{ margin: 0, left: 'none', right: 'none' }}
                        />
                      }
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
                    </VerticalTimelineElement>
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
