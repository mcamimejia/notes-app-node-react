import React, { useContext  } from 'react';
import { AuthContext } from './AuthProvider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

function MainBar() {
  const { logout, user } = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CM NotesApp
          </Typography>
          {user && <Button startIcon={<LogoutIcon />}size="medium" color="inherit" variant='text' onClick={logout}>{user.userName}</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainBar;