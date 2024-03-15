import React from 'react'
import { Box } from '@mui/material'
import GeographyChart from '../../components/GeographyChart'
import Header from '../../components/Header'
import { useTheme } from '@emotion/react'
import { tokens } from '../../themes'

const Geography = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
  return (
    <Box m={"20px"}>
        <Header title={"Geography Chart"} subtitle={"World Map"} />
        <Box height={"75vh"} border={`1px solid ${colors.grey[100]}`}>
            <GeographyChart />
        </Box>
    </Box>
  )
}

export default Geography
