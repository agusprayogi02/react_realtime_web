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
  Menu,
  MenuItem,
  Paper,
  Button,
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

function SideLeft() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ruangan, setRuangan] = React.useState([]);
  const [value, setValue] = React.useState("")
  const [title, setTitle] = React.useState("")

  React.useEffect(() => {
    var getruang = async () => {
      var res = await Axios.get(constant.apiUrl + '/ruangan')
      if (res.status === 200) {
        setRuangan(res.data)
      }
      io.on("getBarcode", (fn) => {
        console.log(fn);
        if (fn != null) {
          setValue(fn)
        }
      })
      io.on('berubah', (res) => {
        io.emit("getBarcode", title)
      })
    }
    getruang()
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const coba = () => {
    io.emit('absen', {
      lokasi: "isi",
      absen: "Izin",
      nisn: "0026511951",
      ket: "Tidak Apa",
      kelas: "b82192813a97008dc58719cfa373c2f4e796bb5936bf34b4ace6457f7c07ea37edee2bb33412c588b72d961403ac2e71f06da9448161304894964eb9ec3eb7022ed4875422b1f58f239a2f6e5ea316e813f37c7f32b758064a16dcda5b06e6e021f4f1830f-38675"
    })
  }

  const handleClose = (val) => {
    setTitle(val);
    io.emit("getBarcode", val)
    setAnchorEl(null);
  };
  const classes = useStyles()
  return (<Card variant="outlined" className={classes.root}>
    <CardHeader style={{ backgroundColor: 'lightskyblue' }} title="Pembuatan QRCode" />
    <CardContent>
      <Button aria-controls="simple-menu" variant="outlined" aria-haspopup="true" onClick={handleClick}>
        Pilih Ruang</Button>
      <Button onClick={coba}>{title ?? "Cek"}</Button>
      <br />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {ruangan.map((val, i) =>
          <MenuItem style={{ width: 200 }} key={i} onClick={() => handleClose(val.ruangan)}>{val.ruangan}</MenuItem>
        )}
      </Menu>
      <br />
      <QRGenarate value={value} />
    </CardContent>
  </Card>)
}

function Home() {
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

  React.useEffect(() => {
    var getData = async () => {
      var res = await Axios.get(constant.apiUrl + '/user/all')
      if (res.status === 200) {
        perubahan(res.data)
      }
      io.on('berubah', (res) => {
        io.emit('cekAbsen', res)
        perubahan(data)
      })

      io.on("cekAbsen", (hasil) => {
        console.log(hasil);
      })
      io.on("hasilAbsen", (hasil) => {
        console.log(hasil);
      })
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
                      {item.absen ? (
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
          <SideLeft />
        </Grid>
      </Grid>
    </div>
  )
}
export default Home
