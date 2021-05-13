import { db } from '..';
export const streamEngagements = (observer) => {
  db.collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/engagements')
    .where('shiftEnd', '>=', new Date(Date.now()))
    .orderBy('shiftEnd', 'asc')
    .onSnapshot(observer);
};

export const takeShift = (id, userId) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/engagements')
    .doc(id)
    .update({ userId: userId, upForGrabs: false });
};

export const setUpForGrabs = (id, status) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/engagements')
    .doc(id)
    .update({ upForGrabs: status });
};

export const deleteEngagement = (engagement) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/engagements')
    .doc(engagement.id)
    .delete();
};

export const createEngagement = (engagement) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/engagements')
    .add(engagement);
};
