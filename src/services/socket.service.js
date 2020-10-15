import IO from 'socket.io-client'
var socket = IO.connect('ws://localhost:4000', {
    reconnectionDelayMax: 10000,
})
export default socket