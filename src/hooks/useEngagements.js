import { message } from 'antd';
import { useEffect, useState } from 'react';

import { getEngagements } from '../firebase/api';

const useEngagements = () => {
  const [engagementState, setEngagementState] = useState({
    loading: false,
    isLoaded: false,
    engagements: [],
  });

  useEffect(() => {
    setEngagementState({ ...engagementState, loading: true });
    fetchEngagements();
  }, [setEngagementState]);

  const fetchEngagements = () => {
    getEngagements()
      .then((_engagements) =>
        setEngagementState({
          loading: false,
          isLoaded: true,
          engagements: _engagements,
        })
      )
      .catch((error) => message.error('An error occurred: ', error.message));
  };

  return { engagementState, fetchEngagements };
};

export default useEngagements;
