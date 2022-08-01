import React, { useState } from 'react'
import Log from './log/Log'
import Navbar from './navBar'
import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  ThemeProvider,
  Container,
  createTheme
} from '../common/muiImports'
import { renderComponent } from '../layout/mainComponents';
import FilterDate from '../layout/DatePicker';

const Monitor = () => {
  const mdTheme = createTheme();
 
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", overflow: "auto" }}>
        <CssBaseline />
        <Navbar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100%",
            width: "55%",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <FilterDate/>

            <Grid container spacing={3}>
              {renderComponent.map((component, index) => {
                const { componentType } = component
                return (
                  <Grid key={index} item xs={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 500,
                       
                      }}
                    >
                      {componentType}
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            // flexGrow: 0.4,
            width: "42%",
            right: "2%",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                   position: "fixed",
                  }}>
                  <Log />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Monitor