import { Divider, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import {
  createEngagement,
  deleteEngagement,
  getEngagements,
  getEvents,
  getShifts,
  getUsers,
} from '../../../firebase/api';
import EventListItem from '../../../styles/molecules/EventListItem';
import SideBarPage from '../../../styles/templates/SideBarPage';

const ShiftManagement = () => {
  const [events, setEvents] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [users, setUsers] = useState([]);
  const [engagements, setEngagements] = useState([]);

  const getEventShifts = (eventId) => {
    return shifts.filter((shift) => shift.eventId === eventId);
  };

  const updateEngagements = () => {
    getEngagements()
      .then((_engagements) => setEngagements(_engagements))
      .catch((error) => message.error('An error occurred: ', error.message));
  };
  const addEngagement = (newEngagement) => {
    createEngagement(newEngagement)
      .then(() => {
        updateEngagements();
        message.success(`${newEngagement.type} has been added to the shift`);
      })
      .catch((error) => message.error('An error occurred: ', error.message));
  };
  const removeEngagement = (engagement) => {
    deleteEngagement(engagement)
      .then(() => {
        updateEngagements();
        message.success('Tender removed from shift');
      })
      .catch((error) => message.error('An error occurred: ', error.message));
  };
  useEffect(() => {
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
    <SideBarPage title="Shift Management">
      <Space direction="vertical" style={{ width: '100%' }}>
        {events.map((each, i) => {
          return (
            <EventListItem
              event={each}
              shifts={getEventShifts(each.id)}
              engagements={engagements}
              key={i}
              manage
              users={users}
              onAddEngagement={addEngagement}
              onRemoveEngagement={removeEngagement}
            />
          );
        })}
      </Space>
      <Divider />
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
ShiftManagement.propTypes = {

} 
*/
export default ShiftManagement;
