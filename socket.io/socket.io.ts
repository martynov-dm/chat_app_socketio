import { Socket } from 'socket.io'
import { io } from '../index'

io.on('connect', (socket: Socket) => {
  console.log('We have a new connection!!', socket.id)

  // socket.on('disconnect', () => {
  //   console.log('User had left')
  // })
})
