import { message } from 'antd';
import { useEffect, useState } from 'react';

import { getShifts } from '../firebase/api';

const useShifts = () => {
  const [shiftState, setShiftState] = useState({
    loading: false,
    isLoaded: false,
    events: [],
  });

  useEffect(() => {
    setShiftState({ ...shiftState, loading: true });
    fetchShifts();
  }, [setShiftState]);

  const fetchShifts = () => {
    getShifts()
      .then((_shifts) =>
        setShiftState({ loading: false, isLoaded: true, shifts: _shifts })
      )
      .catch((error) => message.error('An error occurred: ', error.message));
  };

  return { shiftState, fetchShifts };
};

export default useShifts;
