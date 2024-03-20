import React from 'react'
import { Button } from '@mui/material'

const ExportButton = ({exportType}) => {
  return (
    <Button
    variant="outlined"
    sx={{
      boxShadow: "none",
  margin: "0 10px"
    }}
  >
    Export
  </Button>
  )
}

export default ExportButton