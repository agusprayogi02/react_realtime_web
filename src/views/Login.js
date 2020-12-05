import React from 'react'
import {Card, CardContent, CardHeader, TextField, Grid, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  br: {
    marginTop: 20,
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}))

export default function Login() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={3} justify="center">
          <Card>
            <CardHeader title="Login" />
            <CardContent>
              <form noValidate autoComplete="off">
                <TextField className={classes.textField} id="standard-basic" label="NISN / NIP" />
                <div className={classes.br} />
                <TextField
                  type="date"
                  defaultValue="2000-01-01"
                  className={classes.textField}
                  id="standard-basic"
                  label="Tanggal Lahir"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
