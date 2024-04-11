import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box sx={{ display: 'flex' , width: '100%',alignItems: 'center',justifyContent:'center'}}>
    <CircularProgress sx={{alignSelf: 'center'}} />
  </Box>
  )
}

export default Loading