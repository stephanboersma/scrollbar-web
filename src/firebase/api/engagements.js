import { db } from '..';
import { getUsers } from './authentication';

export const getEngagements = () => {
  return new Promise((resolve, reject) => {
    getUsers()
      .then((users) => {
        console.log('Reading /engagements');
        db.collection('/env')
          .doc(process.env.REACT_APP_ENV)
          .collection('/engagements')
          .where('shiftEnd', '>=', new Date(Date.now()))
          .orderBy('shiftEnd', 'asc')
          .get()
          .then((res) =>
            res.docs.map((doc) => {
              return { id: doc.id, key: doc.id, ...doc.data() };
            })
          )
          .then((engagements) => {
            resolve(
              engagements.map((engagement) => {
                return {
                  ...engagement,
                  user: users.filter(
                    (user) => user.id === engagement.userId
                  )[0],
                };
              })
            );
          })
          .catch(reject);
      })
      .catch(reject);
  });
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
