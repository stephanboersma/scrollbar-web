import { auth, db, storage } from '..';
import { getCollection, getDocument, getExtension } from './common';

export const createAccount = (form) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(async (user) => {
        const userData = {
          displayName: `${form.firstname} ${form.surname}`,
          email: form.email,
          studyline: form.studyline,
          isAdmin: false,
          roles: ['regular_access', 'tender'],
          phone: null,
          isPassive: false,
          active: true,
        };
        await db
          .collection('/env')
          .doc(process.env.REACT_APP_ENV)
          .collection('/invites')
          .doc(form.email)
          .update({ registered: true });
        saveUser(user.user.uid, userData)
          .then(() => resolve(userData))
          .catch(reject);
      })
      .catch(reject);
  });
};

export const loginWithEmailAndPassword = (email, password) => {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(email, password).then((user) => {
      getDocument('users', user.uid)
        .then((userData) => resolve(userData))
        .catch((error) => reject(error));
    });
  });
};

export const checkIfEmailIsInvited = (email) => {
  return getDocument('invites', email);
};

export const getStudyLines = () => {
  return getCollection('/studylines');
};

export const getUser = (id) => {
  return new Promise((resolve, reject) => {
    getDocument('/users', id)
      .then((user) => {
        getDocument('/studylines', user.studyline)
          .then((studyline) => {
            resolve({ ...user, studyline: studyline });
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

export const getActiveTenders = () => {
  return new Promise((resolve, reject) => {
    getUsers()
      .then((users) => {
        resolve(
          users
            .filter((user) => !user.roles.includes('passive'))
            .map((user) => {
              return {
                displayName: user.displayName,
                studyline: user.studyline,
                photoUrl: user.photoUrl,
              };
            })
        );
      })
      .catch(reject);
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    getCollection('/studylines')
      .then((studylines) => {
        getCollection('/users')
          .then((users) => {
            resolve(
              users.map((user) => {
                return {
                  ...user,
                  studyline: studylines.filter(
                    (studyline) => studyline.id === user.studyline
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

export const getInvitedUsers = () => {
  return getCollection('/invites');
};

export const inviteUser = (email) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/invites')
    .doc(email)
    .set({ registered: false });
};

export const deleteInvite = ({ id }) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/invites')
    .doc(id)
    .delete();
};

export const updateUser = ({ id, field, value }) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/users')
    .doc(id)
    .update({ [field]: value });
};

export const uploadProfilePicture = (picture, email) => {
  return storage
    .ref(
      `${process.env.REACT_APP_ENV}/profile_pictures/${email}.${getExtension(
        picture.name
      )}`
    )
    .put(picture, {
      contentType: picture.type,
      customMetadata: { uploadedBy: email },
    })
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    });
};

const saveUser = (id, profile) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/users')
    .doc(id)
    .set(profile);
};
export const signOut = () => auth.signOut();
