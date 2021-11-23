import { Checkbox, Collapse, DatePicker, Divider, message, Space } from 'antd';
import moment from 'moment';
import React, { useContext, useState } from 'react';

import AuthContext from '../../contexts/AuthContext';
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

  const { Panel } = Collapse;

  const { user } = useContext(AuthContext);

  const [myShiftChecked, setMyShiftChecked] = useState(false);
  const [showPreviousShifts, setShowPreviousShifts] = useState(false);
  const [shiftFrom, setShiftFrom] = useState(moment().subtract(1, 'months'));

  const getEventEngagements = (eventId) => {
    return engagementState.engagements.filter(
      (engagement) => engagement.eventId === eventId
    );
  };
  const getEventShifts = (eventId) => {
    return shiftState.shifts.filter((shift) => shift.eventId === eventId);
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

  const filterEventsWithUser = (events, userId) => {
    var eventidsWithUser = engagementState.engagements
      .filter((engagement) => engagement.userId === userId)
      .map((e) => e.eventId);
    return events.filter((_event) => eventidsWithUser.includes(_event.id));
  };

  return (
    <SideBarPage title="Tender site">
      <Collapse
        title="Filters"
        direction="vertical"
        style={{ width: '100%' }}
        ghost
        bordered
      >
        <Panel header="Filters">
          <Checkbox
            checked={myShiftChecked}
            onChange={(e) => setMyShiftChecked(e.target.checked)}
          >
            Show my shifts only
          </Checkbox>
          <Checkbox
            checked={showPreviousShifts}
            onChange={(e) => setShowPreviousShifts(e.target.checked)}
          >
            Show previous shifts from
          </Checkbox>
          <DatePicker
            value={shiftFrom}
            onChange={(date) =>
              date ? setShiftFrom(date) : setShiftFrom(moment())
            }
          ></DatePicker>
        </Panel>
      </Collapse>
      <Divider></Divider>
      <Space direction="vertical" style={{ width: '100%' }}>
        {eventState.events.filter((_event) => _event).length > 0 ? (
          (showPreviousShifts
            ? myShiftChecked
              ? filterEventsWithUser(
                  eventState.previousEvents
                    .filter((e) => e.start.toDate() >= shiftFrom.toDate())
                    .concat(eventState.events),
                  user.id
                )
              : eventState.previousEvents
                  .filter((e) => e.start.toDate() >= shiftFrom.toDate())
                  .concat(eventState.events)
            : myShiftChecked
            ? filterEventsWithUser(eventState.events, user.id)
            : eventState.events
          ).map((each, i) => {
            return (
              <EventListItem
                event={each}
                engagements={getEventEngagements(each.id)}
                shifts={getEventShifts(each.id)}
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
