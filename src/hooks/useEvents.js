import { message } from 'antd';
import { useEffect, useState } from 'react';

import {
  createEvent,
  deleteEvent,
  streamEvents,
  updateEvent as update,
} from '../firebase/api';

const useEvents = () => {
  const [eventState, setEventState] = useState({
    loading: false,
    isLoaded: false,
    events: [],
    previousEvents: [],
  });

  useEffect(async () => {
    setEventState({ ...eventState, loading: true });
    const unsubscribe = streamEvents({
      next: (snapshot) => {
        const updatedEvents = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, key: doc.id };
        });
        setEventState({
          ...eventState,
          loading: false,
          isLoaded: true,
          events: updatedEvents.filter(
            (_event) => _event.end.toDate() >= new Date(Date.now())
          ),
          previousEvents: updatedEvents.filter(
            (_event) => _event.end.toDate() < new Date(Date.now())
          ),
        });
      },
      error: (error) => message.error('An error occurred: ' + error.message),
    });
    return unsubscribe;
  }, [setEventState]);

  const addEvent = (event) => {
    return createEvent(event);
  };

  const removeEvent = (event) => {
    return deleteEvent(event);
  };
  const updateEvent = (id, field, value) => {
    return update({
      id: id,
      field: field,
      value: value,
    });
  };

  return { eventState, addEvent, removeEvent, updateEvent };
};

export default useEvents;
