import { message } from 'antd';
import { useEffect, useState } from 'react';

import { getInvitedUsers, getUsers } from '../firebase/api';

const useTenders = () => {
  const [tenderState, setTenderState] = useState({
    loading: false,
    isLoaded: false,
    tenders: [],
    invitedTenders: [],
  });

  useEffect(() => {
    console.log('useTenders');
    setTenderState({ ...tenderState, loading: true });
    fetchTenders();
  }, [setTenderState]);

  const fetchTenders = () => {
    getUsers()
      .then((_users) =>
        setTenderState({ loading: false, isLoaded: true, tenders: _users })
      )
      .catch((error) => message.error('An error occurred: ', error.message));
  };
  const fetchInvitedTenders = () => {
    getInvitedUsers()
      .then((invited) =>
        setTenderState({ ...tenderState, invitedTenders: invited })
      )
      .catch((error) => message.error('An error occurred: ' + error.message));
  };

  return { tenderState, fetchTenders, fetchInvitedTenders };
};

export default useTenders;
