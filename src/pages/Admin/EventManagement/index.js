import { Button, Divider, Drawer, message, Tabs } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  createEvent,
  createShift,
  deleteEvent,
  deleteShift,
  getEvents,
  getShifts,
  updateEvent,
  updateShift,
} from '../../../firebase/api';
import DataTable from '../../../styles/molecules/DataTable';
import EventInfo from '../../../styles/molecules/EventInfo';
import SideBarPage from '../../../styles/templates/SideBarPage';
import { EVENT_COLUMNS } from './tableColumns';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #171717;
  }
  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active,
  .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab-active {
    border: 1px solid #fff319;
    border-bottom-color: #fff;
  }
`;

const StyledTabPane = styled(TabPane)`
  padding: 0 ${({ theme }) => theme.baseUnit}px;
`;
const StyledButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.baseUnit}px;
`;

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [oldEvents, setOldEvents] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [isEventInfoVisible, setIsEventInfoVisible] = useState(false);

  const createNewEvent = () => {
    const possibleDates = getNextPossibleFridayBar();
    const newEvent = {
      displayName: 'New event',
      where: 'Scrollbar',
      description: '# Add Description here\nUse markdown for styling',
      start: possibleDates[0],
      end: possibleDates[1],
      published: false,
    };
    createEvent(newEvent)
      .then((res) => {
        message.success('A new event has been created');
        setSelectedEvent({ ...newEvent, id: res.id });
        updateEvents();
        setIsEventInfoVisible(true);
      })
      .catch((error) => message.error('An error ocurred: ' + error.message));
  };

  const duplicateEvent = (event) => {
    const possibleDates = getNextPossibleFridayBar();
    const newEvent = {
      displayName: event.displayName + ' Duplicate',
      where: event.where,
      description: event.description,
      start: possibleDates[0],
      end: possibleDates[1],
      published: false,
    };
    createEvent(newEvent)
      .then((res) => {
        setSelectedEvent({ ...newEvent, id: res.id });
        updateEvents();
        shifts
          .filter((shift) => shift.eventId === event.id)
          .forEach((shift) => addShift({ ...shift, eventId: res.id }));
      })
      .catch((error) => message.error('An error ocurred: ' + error.message));
  };
  const updateEventField = (field, value) => {
    updateEvent({ id: selectedEvent.id, field: field, value: value })
      .then(() => {
        setSelectedEvent({ ...selectedEvent, [field]: value });
        updateEvents();
      })
      .catch((error) => message.error('An error occurred ' + error.message));
  };

  const updateEvents = (old) => {
    getEvents(old)
      .then((events) => {
        if (old) {
          setOldEvents(
            events.map((event) => {
              return {
                ...event,
                start: event.start.toDate(),
                end: event.end.toDate(),
              };
            })
          );
        } else {
          setEvents(
            events.map((event) => {
              return {
                ...event,
                start: event.start.toDate(),
                end: event.end.toDate(),
              };
            })
          );
        }
      })
      .catch((error) => message.error('An error occurred: ' + error.message));
  };

  const onEventEdit = (event) => {
    setSelectedEvent(event);
    setSelectedShifts(shifts.filter((shift) => shift.eventId === event.id));
    setIsEventInfoVisible(true);
  };
  const onEventDelete = (event) => {
    deleteEvent(event)
      .then(() => {
        message.success('Event deleted');
        shifts
          .filter((shift) => shift.eventId === event.id)
          .forEach(onDeleteShift);
        updateEvents();
      })
      .catch((error) => message.error('An error occurred: ' + error.message));
  };
  const onDeleteShift = (shift) => {
    deleteShift(shift)
      .then(() => {
        message.success('Shift deleted');
        updateShifts();
      })
      .catch((error) => message.error('An error occurred: ' + error.message));
  };
  const addShift = (duplicate) => {
    const newShift = {
      title: duplicate ? duplicate.title : 'Opening',
      location: duplicate ? duplicate.location : 'Main bar',
      start: moment(selectedEvent.start).subtract(1, 'hours').toDate(),
      end: moment(selectedEvent.start).add(6, 'hours').toDate(),
      eventId: duplicate ? duplicate.eventId : selectedEvent.id,
      anchors: duplicate ? duplicate.anchors : 1,
      tenders: duplicate ? duplicate.tenders : 4,
    };
    createShift(newShift)
      .then(() => updateShifts())
      .catch((error) => message.error('An error occurred: ' + error.message));
  };

  const updateShiftField = (id, field, value) => {
    updateShift({ id: id, field: field, value: value })
      .then(() => {
        updateShifts();
      })
      .catch((error) => message.error('An error occurred ' + error.message));
  };

  const updateShifts = () => {
    getShifts()
      .then((shifts) => {
        setShifts(
          shifts.map((shift) => {
            return {
              ...shift,
              key: shift.id,
            };
          })
        );
        if (isEventInfoVisible) {
          setSelectedShifts(
            shifts.filter((shift) => shift.eventId === selectedEvent.id)
          );
        }
      })
      .catch((error) => message.error('An error occurred: ' + error.message));
  };

  const getNextPossibleFridayBar = () => {
    const dayINeed = 5;
    const today = moment().isoWeekday();

    // if we haven't yet passed the day of the week that I need:
    if (today <= dayINeed) {
      // then just give me this week's instance of that day
      const start = moment().isoWeekday(dayINeed).hour(15).minute(0).second(0);
      const end = moment(start).add(11, 'hours');
      return [start.toDate(), end.toDate()];
    } else {
      // otherwise, give me *next week's* instance of that same day
      const start = moment()
        .add(1, 'weeks')
        .isoWeekday(dayINeed)
        .hour(15)
        .minute(0)
        .second(0);
      const end = moment(start).add(11, 'hours');
      return [start.toDate(), end.toDate()];
    }
  };

  useEffect(() => {
    updateEvents(false);
    updateEvents(true);
    updateShifts();
  }, []);
  return (
    <SideBarPage title="Event Management">
      <StyledTabs type="card" defaultActiveKey="1">
        <StyledTabPane tab="Events" key="1">
          <StyledButton type="primary" onClick={() => createNewEvent(null)}>
            New event
          </StyledButton>
          <DataTable
            data={events}
            columns={EVENT_COLUMNS(onEventEdit, onEventDelete, duplicateEvent)}
          />
        </StyledTabPane>
        <StyledTabPane tab="Previous events" key="2">
          <DataTable
            data={oldEvents}
            columns={EVENT_COLUMNS(onEventEdit, onEventDelete, duplicateEvent)}
          />
        </StyledTabPane>
      </StyledTabs>
      <Divider />
      <Drawer
        width={800}
        placement="right"
        title="Event"
        onClose={() => setIsEventInfoVisible(false)}
        visible={isEventInfoVisible}
      >
        <EventInfo
          updateEvent={(field, value) => updateEventField(field, value)}
          shifts={selectedShifts}
          onAddShift={addShift}
          onUpdateShift={updateShiftField}
          onDeleteShift={onDeleteShift}
          event={selectedEvent}
        />
      </Drawer>
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
Admin.propTypes = {

} 
*/
export default EventManagement;
