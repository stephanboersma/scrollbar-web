import React from 'react';

import TendersContext from '../contexts/TendersContext';
import useTenders from '../hooks/useTenders';

const TendersProvider = ({ children }) => {
  const tenderStore = useTenders();
  return (
    <TendersContext.Provider value={tenderStore}>
      {children}
    </TendersContext.Provider>
  );
};

export default TendersProvider;
