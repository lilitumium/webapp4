import React, { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TasksList from './TasksList';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import firebaseApp from '../config/firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const theme = createTheme();

const Home = () => {
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    let users = [];
    const querysnapshot = await getDocs(collection(firestore, 'users'));
    querysnapshot.forEach((doc) => {
      const userid = doc.id;
      const userdata = doc.data();
      users.push({
        id: userid,
        ...userdata
      });
    });
    return users;
  };

  const handleClose = () => {
    signOut(auth);
  };
  const fetchInfo = useCallback(async () => {
    const users = await getUsers();
    setUsers(users);
  }, []);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        {users ? (
          <TasksList arrayInfo={users} refetch={fetchInfo} />
        ) : (
          <CircularProgress />
        )}
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            type="button"
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClose}
          >
            Sign off
          </Button>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
