import PropTypes from 'prop-types';
import React from 'react';

import EventListItem from '../EventListItem';

const FilteredShifts = ({
  mode,
  userId,
  shifts,
  engagements,
  events,
  onTakeShift,
  onSetUpForGrabs,
  tenders,
}) => {
  const getEventEngagements = (eventId) => {
    return engagements.filter((engagement) => engagement.eventId === eventId);
  };
  const getEventShifts = (eventId) => {
    return shifts.filter((shift) => shift.eventId === eventId);
  };

  const filterEventsWithUser = (events) => {
    var eventidsWithUser = engagements
      .filter((engagement) => engagement.userId === userId)
      .map((e) => e.eventId);
    return events.filter((_event) => eventidsWithUser.includes(_event.id));
  };

  const getEventShiftsFilteredWithUser = (eventId) => {
    var shiftIdsWithUser = engagements
      .filter((engagement) => engagement.userId === userId)
      .map((e) => e.shiftId);
    return getEventShifts(eventId).filter((_shift) =>
      shiftIdsWithUser.includes(_shift.id)
    );
  };

  const filterEventsWithUpForGrabs = (events) => {
    var eventIdsWithUpForGrabs = engagements
      .filter((engagement) => engagement.upForGrabs === true)
      .map((e) => e.eventId);
    return events.filter((_event) =>
      eventIdsWithUpForGrabs.includes(_event.id)
    );
  };

  const getEventShiftsFilteredWithUpForGrabs = (eventId) => {
    var shiftidsWithUser = engagements
      .filter((engagement) => engagement.upForGrabs === true)
      .map((e) => e.shiftId);
    return getEventShifts(eventId).filter((_shift) =>
      shiftidsWithUser.includes(_shift.id)
    );
  };

  return (
    <div>
      {mode === 'all' &&
        events.map((each, i) => {
          return (
            <EventListItem
              event={each}
              engagements={getEventEngagements(each.id)}
              shifts={getEventShifts(each.id)}
              key={i}
              users={tenders}
              onTakeShift={onTakeShift}
              setUpForGrabs={onSetUpForGrabs}
            />
          );
        })}
      {mode === 'myShifts' &&
        filterEventsWithUser(events, userId).map((each, i) => {
          return (
            <EventListItem
              event={each}
              engagements={getEventEngagements(each.id)}
              shifts={getEventShiftsFilteredWithUser(each.id, userId)}
              key={i}
              users={tenders}
              onTakeShift={onTakeShift}
              setUpForGrabs={onSetUpForGrabs}
            />
          );
        })}
      {mode === 'upforgrabs' &&
        filterEventsWithUpForGrabs(events, userId).map((each, i) => {
          return (
            <EventListItem
              event={each}
              engagements={getEventEngagements(each.id)}
              shifts={getEventShiftsFilteredWithUpForGrabs(each.id, userId)}
              key={i}
              users={tenders}
              onTakeShift={onTakeShift}
              setUpForGrabs={onSetUpForGrabs}
            />
          );
        })}
    </div>
  );
};

FilteredShifts.propTypes = {
  mode: PropTypes.any,
  userId: PropTypes.any,
  shifts: PropTypes.any,
  engagements: PropTypes.any,
  events: PropTypes.any,
  tenders: PropTypes.any,
  onTakeShift: PropTypes.Func,
  onSetUpForGrabs: PropTypes.Func,
};

export default FilteredShifts;
