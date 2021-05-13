import { message } from 'antd';
import { useEffect, useState } from 'react';

import {
  createShift,
  deleteShift,
  streamShifts,
  updateShift as update,
} from '../firebase/api';

const useShifts = () => {
  const [shiftState, setShiftState] = useState({
    loading: false,
    isLoaded: false,
    shifts: [],
  });

  useEffect(() => {
    setShiftState({ ...shiftState, loading: true });
    const unsubscribe = streamShifts({
      next: (snapshot) => {
        const updatedShifts = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, key: doc.id };
        });
        setShiftState({
          ...shiftState,
          loading: false,
          isLoaded: true,
          shifts: updatedShifts,
        });
      },
      error: (error) => message.error('An error occurred: ' + error.message),
    });
    return unsubscribe;
  }, [setShiftState]);

  const addShift = (shift) => {
    return createShift(shift);
  };
  const removeShift = (shift) => {
    return deleteShift(shift);
  };

  const updateShift = (id, field, value) => {
    return update({
      id: id,
      field: field,
      value: value,
    });
  };

  return { shiftState, addShift, removeShift, updateShift };
};

export default useShifts;
