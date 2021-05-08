import { message, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import {
  getEngagements,
  getEvents,
  getShifts,
  getUsers,
  setUpForGrabs,
  takeShift,
} from '../../firebase/api';
import EventListItem from '../../styles/molecules/EventListItem';
import SideBarPage from '../../styles/templates/SideBarPage';

const ShiftPlan = () => {
  const [events, setEvents] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [users, setUsers] = useState([]);
  const [engagements, setEngagements] = useState([]);

  const getEventShifts = (eventId) => {
    return shifts.filter((shift) => shift.eventId === eventId);
  };
  const getEventEngagements = (eventId) => {
    return engagements.filter((engagement) => engagement.eventId === eventId);
  };

  const onTakeShift = (engagement, userId) => {
    takeShift(engagement.id, userId)
      .then(() => {
        updateEngagements();
        message.success('Grabbed a shift!');
      })
      .catch((error) => message.error('An error occurred: ' + error.message));
  };
  const onSetUpForGrabs = (engagement, status) => {
    setUpForGrabs(engagement.id, status)
      .then(() => {
        updateEngagements();
        message.success(
          status ? 'Shift is up for grabs!' : 'Shift is no longer up for grabs'
        );
      })
      .catch((error) => message.error('An error occurred: ' + error.message));
  };
  const updateEngagements = () => {
    getEngagements()
      .then((_engagements) => setEngagements(_engagements))
      .catch((error) => message.error('An error occurred: ', error.message));
  };
  useEffect(() => {
    console.log('ShiftPlan render');
    getUsers()
      .then((_users) => setUsers(_users))
      .catch((error) => message.error('An error occurred: ', error.message));
    getEvents(false)
      .then((_events) => setEvents(_events))
      .catch((error) => message.error('An error occurred: ', error.message));
    getShifts()
      .then((_shifts) => setShifts(_shifts))
      .catch((error) => message.error('An error occurred: ', error.message));
    updateEngagements();
  }, []);
  return (
    <SideBarPage title="Member's lounge">
      <Space direction="vertical" style={{ width: '100%' }}>
        {events.map((each, i) => {
          return (
            <EventListItem
              event={each}
              shifts={getEventShifts(each.id)}
              engagements={getEventEngagements(each.id)}
              key={i}
              users={users}
              onTakeShift={onTakeShift}
              setUpForGrabs={onSetUpForGrabs}
            />
          );
        })}
      </Space>
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
ShiftPlan.propTypes = {

} 
*/
export default ShiftPlan;
