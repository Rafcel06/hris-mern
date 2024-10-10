import React from 'react'
import { Button } from '@mui/material';
import useSnackbar from '../Api/useSnakbar'

const Files = () => {
  const { SnackbarComponent, showSnackbar } = useSnackbar();

  const handleClick = () => {
    showSnackbar('This is a success message');
  };

 
  return (
    <div>
      <h2>Example Component</h2>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Show Success Snackbar
      </Button>

      {/* Render the SnackbarComponent */}
      <SnackbarComponent />
    </div>
  )
}

export default Files
