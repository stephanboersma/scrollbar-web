import { Divider, message, Space } from 'antd';
import React, { useContext } from 'react';

import EngagementContext from '../../../contexts/EngagementContext';
import EventContext from '../../../contexts/EventContext';
import ShiftContext from '../../../contexts/ShiftContext';
import TendersContext from '../../../contexts/TendersContext';
import { Text } from '../../../styles/atoms/Typography';
import EventListItem from '../../../styles/molecules/EventListItem';
import SideBarPage from '../../../styles/templates/SideBarPage';

const ShiftManagement = () => {
  const { eventState } = useContext(EventContext);
  const { shiftState } = useContext(ShiftContext);
  const { tenderState } = useContext(TendersContext);
  const { engagementState, addEngagement, removeEngagement } = useContext(
    EngagementContext
  );

  const getEventShifts = (eventId) => {
    return shiftState.shifts.filter((shift) => shift.eventId === eventId);
  };

  const onAddEngagement = (newEngagement) => {
    addEngagement(newEngagement)
      .then(() => {
        message.success(`${newEngagement.type} has been added to the shift`);
      })
      .catch((error) => message.error('An error occurred: ', error.message));
  };
  const onRemoveEngagement = (engagement) => {
    removeEngagement(engagement)
      .then(() => {
        message.success('Tender removed from shift');
      })
      .catch((error) => message.error('An error occurred: ', error.message));
  };

  return (
    <SideBarPage title="Shift Management">
      <Space direction="vertical" style={{ width: '100%' }}>
        {eventState.events.length > 0 ? (
          eventState.events.map((each, i) => {
            return (
              <div key={i}>
                <EventListItem
                  event={each}
                  shifts={getEventShifts(each.id)}
                  engagements={engagementState.engagements}
                  manage
                  users={tenderState.tenders}
                  onAddEngagement={onAddEngagement}
                  onRemoveEngagement={onRemoveEngagement}
                />
                <Divider />
              </div>
            );
          })
        ) : (
          <Text type="secondary">
            Nothing to plan. Go make some events first...
          </Text>
        )}
      </Space>
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
ShiftManagement.propTypes = {

} 
*/
export default ShiftManagement;
