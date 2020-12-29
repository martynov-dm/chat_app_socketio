import express from 'express'
import { Server, Socket } from 'socket.io'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import authRoute from './routes/auth'
import { connect } from './services/mongoose'
import jwtStrategy from './services/passport'

const PORT = process.env.PORT || 5000
const rooms = new Map()

const app = express()
const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket: Socket) => {
  socket.emit('messageFromServer', { data: 'Welcome to the socketio server' })
  socket.on('messageToServer', (dataFromClient: any) => {
    console.log(dataFromClient)
  })
  socket.on('newMessageToServer', (msg) => {
    // console.log(msg)
    io.emit('messageToClients', { text: msg.text })
  })
})

app.use(cors())
passport.initialize()
passport.use('jwt', jwtStrategy)
app.use(bodyParser.json())
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
)
app.use(cookieParser())

connect()

app.use('/api/auth', authRoute)

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
