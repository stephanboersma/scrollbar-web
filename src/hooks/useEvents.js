import { message } from 'antd';
import { useEffect, useState } from 'react';

import { getEvents } from '../firebase/api';

const useEvents = () => {
  const [eventState, setEventState] = useState({
    loading: false,
    isLoaded: false,
    events: [],
  });

  useEffect(() => {
    setEventState({ ...eventState, loading: true });
    fetchEvents();
  }, [setEventState]);

  const fetchEvents = () => {
    console.log('fetch events');
    getEvents(false)
      .then((_events) =>
        setEventState({ loading: false, isLoaded: true, events: _events })
      )
      .catch((error) => message.error('An error occurred: ', error.message));
  };

  return { eventState, fetchEvents };
};

export default useEvents;
