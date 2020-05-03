import { firebaseImpl as firebase } from '../utils/firebase';

export const login = ({ email, password }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user;
    })
    .catch((error) => {throw error});
};

export const logout = () => {
  return firebase
    .auth()
    .signOut()
    .then((resp) => resp)
    .catch((error) => {throw error});
};

export const createUser = ({ email, password, name }) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      await user.updateProfile({ displayName: name });
      return user;
    })
    .catch((error) => {throw error});
};

export const saveWorkingTime = () => {};

export const getReports = () => {};

const FirebaseService = { login, createUser, saveWorkingTime, getReports };

export default FirebaseService;
