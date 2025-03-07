import { message } from 'antd';
import { useEffect, useState } from 'react';

import {
  deleteInvite,
  deleteUser,
  inviteUser,
  streamInvitedUsers,
  streamUsers,
  updateUser,
} from '../firebase/api';

const useTenders = () => {
  const [tenderState, setTenderState] = useState({
    loading: false,
    isLoaded: false,
    tenders: [],
  });
  const [invitedTenders, setInvitedTenders] = useState([]);

  useEffect(() => {
    setTenderState({ ...tenderState, loading: true });
    const unsubscribeTenders = streamUsers({
      next: (snapshot) => {
        const updatedTenders = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, key: doc.id };
        });
        setTenderState({
          ...tenderState,
          loading: false,
          isLoaded: true,
          tenders: updatedTenders,
        });
      },
      error: (error) => message.error('An error occurred: ' + error.message),
    });
    const unsubscribeInvitedTenders = streamInvitedUsers({
      next: (snapshot) => {
        const updatedInvites = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, key: doc.id };
        });
        setInvitedTenders(updatedInvites);
      },
      error: (error) => message.error('An error occurred: ' + error.message),
    });
    return () => {
      unsubscribeInvitedTenders();
      unsubscribeTenders();
    };
  }, [setTenderState]);

  const addInvite = (email) => {
    return inviteUser(email);
  };

  const removeInvite = (row) => {
    return deleteInvite(row);
  };

  const removeUser = (id) => {
    return deleteUser(id);
  };

  const updateTender = (id, field, value) => {
    return updateUser({ id: id, field: field, value: value });
  };

  return {
    tenderState,
    invitedTenders,
    addInvite,
    removeInvite,
    updateTender,
    removeUser,
  };
};

export default useTenders;
