import { message } from 'antd';
import { useEffect, useState } from 'react';

import {
  createEngagement,
  deleteEngagement,
  setUpForGrabs as updateGrabs,
  streamEngagements,
  takeShift as updateShift,
} from '../firebase/api';

const useEngagements = () => {
  const [engagementState, setEngagementState] = useState({
    loading: false,
    isLoaded: false,
    engagements: [],
  });

  useEffect(() => {
    setEngagementState({ ...engagementState, loading: true });
    const unsubscribe = streamEngagements({
      next: (snapshot) => {
        const updatedEngagements = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, key: doc.id };
        });
        setEngagementState({
          ...engagementState,
          loading: false,
          isLoaded: true,
          engagements: updatedEngagements,
        });
      },
      error: (error) => message.error('An error occurred: ' + error.message),
    });
    return unsubscribe;
  }, [setEngagementState]);

  const addEngagement = (newEngagement) => {
    return createEngagement(newEngagement);
  };

  const removeEngagement = (engagement) => {
    return deleteEngagement(engagement);
  };

  const takeShift = (id, userId) => {
    return updateShift(id, userId);
  };

  const setUpForGrabs = (id, status) => {
    return updateGrabs(id, status);
  };

  return {
    engagementState,
    addEngagement,
    removeEngagement,
    takeShift,
    setUpForGrabs,
  };
};

export default useEngagements;
