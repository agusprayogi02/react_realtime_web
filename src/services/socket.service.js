import IO from 'socket.io-client'
import cont from '../utils/constant'
var socket = IO(cont.apiUrl)
export default socket
