import { Divider, message, Space } from 'antd';
import React, { useContext } from 'react';

import EngagementContext from '../../../contexts/EngagementContext';
import EventContext from '../../../contexts/EventContext';
import ShiftContext from '../../../contexts/ShiftContext';
import TendersContext from '../../../contexts/TendersContext';
import { createEngagement, deleteEngagement } from '../../../firebase/api';
import EventListItem from '../../../styles/molecules/EventListItem';
import SideBarPage from '../../../styles/templates/SideBarPage';

const ShiftManagement = () => {
  const { eventState } = useContext(EventContext);
  const { shiftState } = useContext(ShiftContext);
  const { tenderState } = useContext(TendersContext);
  const { engagementState, fetchEngagements } = useContext(EngagementContext);

  const getEventShifts = (eventId) => {
    return shiftState.shifts.filter((shift) => shift.eventId === eventId);
  };

  const addEngagement = (newEngagement) => {
    createEngagement(newEngagement)
      .then(() => {
        fetchEngagements();
        message.success(`${newEngagement.type} has been added to the shift`);
      })
      .catch((error) => message.error('An error occurred: ', error.message));
  };
  const removeEngagement = (engagement) => {
    deleteEngagement(engagement)
      .then(() => {
        fetchEngagements();
        message.success('Tender removed from shift');
      })
      .catch((error) => message.error('An error occurred: ', error.message));
  };

  return (
    <SideBarPage title="Shift Management">
      <Space direction="vertical" style={{ width: '100%' }}>
        {eventState.events.map((each, i) => {
          return (
            <EventListItem
              event={each}
              shifts={getEventShifts(each.id)}
              engagements={engagementState.engagements}
              key={i}
              manage
              users={tenderState.users}
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
