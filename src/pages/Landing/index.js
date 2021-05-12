import 'react-vertical-timeline-component/style.min.css';

import { AntDesignOutlined, CalendarOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { Content } from 'antd/lib/layout/layout';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import hero from '../../assets/hero_video.mp4';
import { getActiveTenders, getEvents } from '../../firebase/api';
import { Paragraph, Text, Title } from '../../styles/atoms/Typography';
import LandingPage from '../../styles/templates/LandingPage';

const Landing = () => {
  const [events, setEvents] = useState([]);
  const [activeTenders, setActiveTenders] = useState([]);

  useEffect(() => {
    getEvents().then((events) =>
      setEvents(events.filter((event) => event.published))
    );
    getActiveTenders().then((tenders) => setActiveTenders(tenders));
  }, []);
  return (
    <LandingPage>
      <div
        style={{
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
        <video
          muted
          loop="loop"
          autoPlay="autoplay"
          style={{
            minHeight: '40vh',
            width: '100%',
            marginTop: '-100px',
            position: 'relative',
          }}
        >
          <source src={hero} type="video/mp4" />
        </video>

        {events.length > 1 && (
          <div
            style={{
              position: 'absolute',
              width: '600px',
              height: '300px',
              bottom: '-100px',
              right: '40px',
              zIndex: 2,
              background: 'rgba(255, 243, 25, 0.8)',
              padding: '24px',
            }}
          >
            <Title>See you next time!</Title>

            <div style={{ paddingRight: '12px' }}>
              <Title level={2}>
                {events[0].displayName} @{' '}
                {moment(events[0].start.toDate())
                  .format('DD-MM-YYYY HH:mm')
                  .toString()}
              </Title>
            </div>
          </div>
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
            span={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Title id="about">About ScrollBar</Title>
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
            span={20}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Title>The volunteers behind</Title>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'space-between' }}
              size={16}
            >
              {activeTenders.map((each, i) => {
                return (
                  <Space direction="vertical" align="center" key={i}>
                    <Avatar
                      src={each.photoUrl}
                      size={100}
                      icon={<AntDesignOutlined />}
                    />
                    <Text>{each.displayName}</Text>
                    <Text type="secondary">
                      {each.studyline.abbreviation.toUpperCase()}
                    </Text>
                  </Space>
                );
              })}
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

            {events.length > 0 ? (
              <VerticalTimeline style={{ width: '100%' }}>
                {events.map((each, i) => {
                  return (
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      iconStyle={{
                        background: '#fff319',
                        color: '#171717',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingTop: '10px',
                      }}
                      icon={<CalendarOutlined size={24} />}
                      date={moment(each.start.toDate())
                        .format('DD-MM-YYYY HH:mm')
                        .toString()}
                      key={i}
                    >
                      <Title
                        level={3}
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
