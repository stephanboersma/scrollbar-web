import { message, Space } from 'antd';
import React, { useContext } from 'react';

import EngagementContext from '../../contexts/EngagementContext';
import EventContext from '../../contexts/EventContext';
import ShiftContext from '../../contexts/ShiftContext';
import TendersContext from '../../contexts/TendersContext';
import { Text } from '../../styles/atoms/Typography';
import EventListItem from '../../styles/molecules/EventListItem';
import SideBarPage from '../../styles/templates/SideBarPage';

const ShiftPlan = () => {
  const { eventState } = useContext(EventContext);
  const { shiftState } = useContext(ShiftContext);
  const { tenderState } = useContext(TendersContext);
  const { engagementState, takeShift, setUpForGrabs } = useContext(
    EngagementContext
  );

  const getEventShifts = (eventId) => {
    return shiftState.shifts.filter((shift) => shift.eventId === eventId);
  };
  const getEventEngagements = (eventId) => {
    return engagementState.engagements.filter(
      (engagement) => engagement.eventId === eventId
    );
  };

  const onTakeShift = (engagement, userId) => {
    takeShift(engagement.id, userId)
      .then(() => {
        message.success('Grabbed a shift!');
      })
      .catch((error) => message.error('An error occurred: ' + error.message));
  };
  const onSetUpForGrabs = (engagement, status) => {
    setUpForGrabs(engagement.id, status)
      .then(() => {
        message.success(
          status ? 'Shift is up for grabs!' : 'Shift is no longer up for grabs'
        );
      })
      .catch((error) => message.error('An error occurred: ' + error.message));
  };

  return (
    <SideBarPage title="Tender site">
      <Space direction="vertical" style={{ width: '100%' }}>
        {eventState.events.filter((_event) => _event).length > 0 ? (
          eventState.events
            .map((each, i) => {
              return (
                <EventListItem
                  event={each}
                  shifts={getEventShifts(each.id)}
                  engagements={getEventEngagements(each.id)}
                  key={i}
                  users={tenderState.tenders}
                  onTakeShift={onTakeShift}
                  setUpForGrabs={onSetUpForGrabs}
                />
              );
            })
        ) : (
          <Text type="secondary">
            No events are currently planned. Stay tuned
          </Text>
        )}
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
