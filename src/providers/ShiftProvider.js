import React from 'react';

import ShiftContext from '../contexts/ShiftContext';
import useShifts from '../hooks/useShifts';

const ShiftProvider = ({ children }) => {
  const shiftStore = useShifts();
  return (
    <ShiftContext.Provider value={shiftStore}>{children}</ShiftContext.Provider>
  );
};

export default ShiftProvider;
