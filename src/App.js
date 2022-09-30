import React, { useCallback, useEffect, useState } from 'react';

import Home from './components/Home';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import firebaseApp from './config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getDocs,
  query,
  collection,
  where,
  getFirestore
} from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

function App() {
  const [userGlobal, setUserGlobal] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUserGlobal(userFirebase);
    } else {
      setUserGlobal(null);
    }
  });
  const getUser = useCallback(async () => {
    const email = userGlobal?.email;
    if (!email) return '';
    const q = query(
      collection(firestore, 'users'),
      where('email', '==', email)
    );
    const userdoc = await getDocs(q);
    let user;
    userdoc.forEach((userdata) => {
      user = userdata.data();
    });
    if (user.Status === 'Blocked') {
      console.log('blocked');
    }
  }, [userGlobal?.email]);
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <div>
      <CssBaseline />
      {userGlobal ? (
        <Home userEmail={userGlobal.email} userglobal={userGlobal} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
