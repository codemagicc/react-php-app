import * as React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ListUser from './components/ListUser';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography color="white" variant="h6" sx={{ mr: 2 }} >REACT PHP</Typography>

              <Link to="/">
                <Typography color="white" sx={{ mr: 2 }} >List Users</Typography>
              </Link>


              <Link to="user/create">
                <Typography color="white" sx={{ mr: 2 }} >Create User</Typography>
              </Link>

            </Toolbar>
          </AppBar>
        </Box>

        <Routes>

          <Route index element={<ListUser />} />

          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<EditUser />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
