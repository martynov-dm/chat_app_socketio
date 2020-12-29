import { Socket } from 'socket.io'
import { io } from '../index'

io.on('connection', (socket: Socket) => {
  socket.emit('messageFromServer', { data: 'Welcome to the socketio server' })
  socket.on('messageToServer', (dataFromClient: any) => {
    console.log(dataFromClient)
  })
  // socket.on('disconnect', () => {
  //   console.log('User had left')
  // })
})
