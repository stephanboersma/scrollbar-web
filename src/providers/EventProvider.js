import React from 'react';

import EventContext from '../contexts/EventContext';
import useEvents from '../hooks/useEvents';

const EventProvider = ({ children }) => {
  const eventStore = useEvents();
  return (
    <EventContext.Provider value={eventStore}>{children}</EventContext.Provider>
  );
};

export default EventProvider;
