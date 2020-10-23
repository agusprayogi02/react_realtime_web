import React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Button, makeStyles} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

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

const CustomAppBar = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Daftar Absensi
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default CustomAppBar
