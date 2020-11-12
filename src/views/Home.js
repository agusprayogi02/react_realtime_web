// import classes from '*.module.sass'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Check, Clear } from '@material-ui/icons'
import Axios from 'axios'
import React from 'react'
import QRGenarate from '../Components/QRGenerate.Component'
import io from '../services/socket.service.js'
import constant from '../utils/constant'
// import User from './database'
import '../App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}))

function Home() {
  const [value, setValue] = React.useState('')
  const [data, setData] = React.useState([])

  var perubahan = async (def) => {
    var absen = await Axios.get(constant.apiUrl + '/absen/today')
    if (absen.status === 200) {
      var berubah = absen.data
      var now = Date.parse(new Date().toLocaleString())
      if (berubah !== null || berubah !== undefined || berubah !== []) {
        berubah.map((val, i) => {
          def.map((dc, inx) => {
            if (val.date === constant.getTanggal(now)) {
              if (val.nisn === dc.nisn) {
                var value = {
                  nisn: dc.nisn,
                  nama: dc.nama,
                  absen: val.absen,
                  jam: constant.getTime(val.waktu),
                  kelas_absen: val.kelas,
                }
                def[inx] = value
              }
            }
          })
        })
      }
    }
    setData(def)
  }

  io.on('berubah', () => {
    perubahan(data)
  })

  React.useEffect(() => {
    var getData = async () => {
      var res = await Axios.get(constant.apiUrl + '/user/all')
      if (res.status === 200) {
        perubahan(res.data)
      }
    }
    getData()
  }, [])
  const classes = useStyles()
  return (
    <div className="App">
      <Grid container direction="row" justify="center" spacing={3} style={{ padding: 20 }}>
        <Grid container item xs={8}>
          <TableContainer component={Paper} variant="outlined">
            <Table className={classes.root} aria-label="caption table">
              <TableHead style={{ backgroundColor: 'lightskyblue' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>NISN</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Absen</TableCell>
                  <TableCell>Kelas</TableCell>
                  <TableCell>Jam</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {++i}
                    </TableCell>
                    <TableCell>{item.nisn}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>
                      {item.absen === true ? (
                        <Alert icon={<Check fontSize="inherit" />} severity="success">
                          Sudah
                        </Alert>
                      ) : (
                          <Alert icon={<Clear fontSize="inherit" />} severity="error">
                            Belum
                          </Alert>
                        )}
                    </TableCell>
                    <TableCell>{item.kelas_absen !== undefined ? item.kelas_absen : ''}</TableCell>
                    <TableCell>{item.jam !== undefined ? item.jam : '00.00'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container item xs={3}>
          <Card variant="outlined" className={classes.root}>
            <CardHeader style={{ backgroundColor: 'lightskyblue' }} title="Pembuatan QRCode" />
            <CardContent>
              <TextField
                id="filled-basic"
                label="Value QRCode"
                style={{ width: 275 }}
                onChange={(txt) => setValue(btoa(txt.target.value))}
                variant="outlined"
              />
              <br />
              <br />
              <QRGenarate value={value} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
export default Home
