import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { Stack, Toolbar, Button, Typography, Checkbox } from '@mui/material';
import firebaseApp from '../config/firebaseConfig';
import { updateDoc, deleteDoc, getFirestore, doc } from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

const dataTransform = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  return format(date, 'dd/MM/yyyy') || '';
};

const TasksList = ({ arrayInfo, refetch }) => {
  const [selected, setSelected] = useState([]);
  const handleSelect = (id) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((selectedid) => selectedid != id)
        : [...selected, id]
    );
  };
  const handleSelectAll = (ids) => {
    const isAllSelected = selected.length === arrayInfo.length;
    setSelected(isAllSelected ? [] : ids);
  };
  const handleBlock = async () => {
    for (const id of selected) {
      await updateDoc(doc(firestore, 'users', id), {
        Status: 'Blocked'
      });
    }
    refetch();
  };
  const handleUnBlock = async () => {
    for (const id of selected) {
      await updateDoc(doc(firestore, 'users', id), {
        Status: 'Active'
      });
    }
    refetch();
  };
  const handleDelete = async () => {
    for (const id of selected) {
      await deleteDoc(doc(firestore, 'users', id));
    }
    refetch();
  };

  return (
    <Stack>
      <Toolbar>
        {selected.length > 0 && (
          <Typography>Selected:{selected.length}</Typography>
        )}
        <Stack flexDirection="row" marginLeft="auto">
          <Button onClick={handleBlock} disabled={selected.length === 0}>
            Block
          </Button>
          <Button onClick={handleUnBlock} disabled={selected.length === 0}>
            Unblock
          </Button>
          <Button onClick={handleDelete} disabled={selected.length === 0}>
            Delete
          </Button>
        </Stack>
      </Toolbar>
      <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selected.length === arrayInfo.length}
                  onChange={() =>
                    handleSelectAll(arrayInfo.map((row) => row.id))
                  }
                  label="Select All"
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Registration</TableCell>
              <TableCell align="right">Last Time Log In</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayInfo.map((row) => {
              const checked = selected.includes(row.id);
              return (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox
                      checked={checked}
                      onChange={() => handleSelect(row.id)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row?.email}</TableCell>
                  <TableCell align="right">
                    {dataTransform(row?.Registration)}
                  </TableCell>
                  <TableCell align="right">
                    {dataTransform(row?.LastTimeLogIn)}
                  </TableCell>
                  <TableCell align="right">{row?.Status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default TasksList;
