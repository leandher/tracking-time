import { firebaseImpl as firebase, firebaseDatabase } from '../utils/firebase';

const login = ({ email, password }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user;
    })
    .catch((error) => {
      throw error;
    });
};

const logout = () => {
  return firebase
    .auth()
    .signOut()
    .then((resp) => resp)
    .catch((error) => {
      throw error;
    });
};

const createUser = ({ email, password, name }) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      await user.updateProfile({ displayName: name });
      return user;
    })
    .catch((error) => {
      throw error;
    });
};

const saveWorkingTime = (workingTime) => {
  const user = firebase.auth().currentUser;
  const ref = firebaseDatabase.ref(user.uid).child('workingTime');

  ref.set(workingTime);
};

const getReports = () => {};

const FirebaseService = {
  login,
  logout,
  createUser,
  saveWorkingTime,
  getReports,
};

export default FirebaseService;
