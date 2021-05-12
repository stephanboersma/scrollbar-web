import React from 'react';

import AppStateContext from '../contexts/AppStateContext';
import { useReducer } from '../utils/useReducer';

const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer();
  return (
    <AppStateContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
