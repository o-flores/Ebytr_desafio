import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@material-ui/core';

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        marginBottom: 5, backgroundColor: '#808080', display: 'flex', alignItems: 'center', padding: 2, color: 'black',
      }}
    >
      <Toolbar>
        <Typography variant="h3" component="div">
          TODO LIST
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
