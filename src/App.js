// import classes from '*.module.sass'
import {ListItem, List, ListItemText, makeStyles, Input} from '@material-ui/core'
import Axios from 'axios'
import React, {useEffect} from 'react'
import {Button, Card} from 'react-bootstrap'
import io from './services/socket.service.js'
// import User from './database'
import './App.css'
const useStyle = makeStyles((theme) => ({
  menuButton: {
    width: 300,
  },
}))

function App() {
  const [data, setData] = React.useState([])
  const [change, setChange] = React.useState('')
  const classes = useStyle()
  useEffect(() => {
    var getData = async () => {
      var res = await Axios.get('http://localhost:4000/user/all')
      setData(res.data)
    }
    getData()
  }, [])
  const send = () => {
    var message = change
    io.emit('send', {
      nisn: message,
    })
  }
  io.on('berhasil', (dt) => {
    setData([dt])
  })
  io.on('added', (no) => {
    console.log('added')
    setData(no)
  })
  io.on('change', (isi) => {
    console.log('berubah')
    setData(isi)
  })
  var click = () => {
    console.log('hai')
  }
  const addded = () => {
    var id = Math.random(9999)
    var ini = {
      _id: 'emaksaka' + id,
      nama: 'Orang tua' + id,
      jk: 'L',
      tgl_lahir: '2001-03-14',
      wali: 'KHOLIPAH',
      nisn: '0018877959',
      kelas: '10',
      jurusan: 'RPL 2',
      role: 'siswa',
    }
    io.emit('edded', ini)
  }
  return (
    <div className="App">
      <Card>
        <Card.Title> Chat </Card.Title>
        <Card.Body>
          <Input onChange={(e) => setChange(e.target.value)} />
          <Button variant="primary" onClick={send}>
            Submit
          </Button>
          <Button variant="primary" onClick={addded}>
            Add
          </Button>
        </Card.Body>
      </Card>
      <h3> {change} </h3>
      <List className={classes.menuButton}>
        {data != null &&
          data.map((res) => (
            <ListItem key={res._id} className="btn">
              <ListItemText> {res.nama} </ListItemText> <ListItemText> {res.jurusan} </ListItemText>
              <Button variant="outline-danger" onClick={click}>
                Delete
              </Button>
            </ListItem>
          ))}
      </List>
    </div>
  )
}
export default App
