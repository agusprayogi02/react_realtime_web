import React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Button, makeStyles} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './views/Home'
import './App.css'
import Login from './views/Login'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const App = () => {
  const classes = useStyles()
  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Daftar Absensi
            </Typography>

            <Button variant="outlined" className={classes.menuButton} color="inherit" href="/">
              Home
            </Button>
            <Button variant="outlined" color="inherit" href="/login">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
