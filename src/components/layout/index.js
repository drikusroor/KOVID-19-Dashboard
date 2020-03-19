import React from 'react'
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <br />
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Koko Koding
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export const Layout = ({ title, children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to={'/dashboard'}>
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to={'/about'} href="/about">
          About
        </Button>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {children}
        <Copyright />
      </Box>
    </Container>
  </>
)
