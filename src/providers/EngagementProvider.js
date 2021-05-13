import React from 'react';

import EngagementContext from '../contexts/EngagementContext';
import useEngagements from '../hooks/useEngagements';

const EngagementProvider = ({ children }) => {
  const engagementStore = useEngagements();
  return (
    <EngagementContext.Provider value={engagementStore}>
      {children}
    </EngagementContext.Provider>
  );
};

export default EngagementProvider;
