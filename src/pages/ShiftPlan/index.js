import { Divider, message, Space } from 'antd';
import React, { useContext, useState } from 'react';

import AuthContext from '../../contexts/AuthContext';
import EngagementContext from '../../contexts/EngagementContext';
import EventContext from '../../contexts/EventContext';
import ShiftContext from '../../contexts/ShiftContext';
import TendersContext from '../../contexts/TendersContext';
import { Text } from '../../styles/atoms/Typography';
import FilteredShifts from '../../styles/molecules/FilteredShifts';
import FilteredShiftsRadioGroup from '../../styles/molecules/FilteredShiftsRadioGroup';
import SideBarPage from '../../styles/templates/SideBarPage';

const ShiftPlan = () => {
  const { eventState } = useContext(EventContext);
  const { shiftState } = useContext(ShiftContext);
  const { tenderState } = useContext(TendersContext);
  const { engagementState, takeShift, setUpForGrabs } =
    useContext(EngagementContext);

  const [mode, setMode] = useState('myShifts');

  const { user } = useContext(AuthContext);

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setMode(mode);
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
      <FilteredShiftsRadioGroup
        handleModeChange={handleModeChange}
        mode={mode}
        userId={user.id}
        shifts={shiftState.shifts}
        engagements={engagementState.engagements}
      ></FilteredShiftsRadioGroup>
      <Divider></Divider>
      <Space direction="vertical" style={{ width: '100%' }}>
        {eventState.events.filter((_event) => _event).length > 0 ? (
          <FilteredShifts
            mode={mode}
            userId={user.id}
            shifts={shiftState.shifts}
            events={eventState.events}
            engagements={engagementState.engagements}
            tenders={tenderState.tenders}
            onTakeShift={onTakeShift}
            onSetUpForGrabs={onSetUpForGrabs}
          ></FilteredShifts>
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
