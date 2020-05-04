import firebase from '../utils/firebase';

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
  const ref = firebase.database().ref(user.uid).child('workingTime');
  var newChildRef = ref.push();

  return newChildRef.set(workingTime);
};

const getWorkingTimeHistory = () => {
  const user = firebase.auth().currentUser;
  if (!user) return [];
  const ref = firebase.database().ref(user.uid).child('workingTime');

  return ref
    .once('value')
    .then((snapshot) => snapshot.toJSON())
    .then((data) => {
      const values = Object.values(data);
      const keys = Object.keys(data);

      return values.map((v, index) => ({ ...v, id: keys[index], breakTimes: Object.values(v.breakTimes || {})}));
    });
};

const FirebaseService = {
  login,
  logout,
  createUser,
  saveWorkingTime,
  getWorkingTimeHistory,
};

export default FirebaseService;
