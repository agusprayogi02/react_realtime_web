import IO from 'socket.io-client'
import cont from '../utils/constant'
var socket = IO.connect(cont.apiUrl, {
  reconnectionDelayMax: 10000,
})
export default socket
