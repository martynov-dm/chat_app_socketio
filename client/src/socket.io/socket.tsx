import React, { createContext } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'

export const SocketContext = createContext(null as any)

interface Iprops {
  children: React.ReactNode
}

export const SocketProvider = (props: Iprops) => {
  const { children } = props
  let socket: Socket
  let ws
  const dispatch = useDispatch()

  const connect = () => {
    socket = socketIOClient.io('http://localhost:5000')
    socket.connect()
    socket.on('messageFromServer', (dataFromServer: string) => {
      console.log(dataFromServer)
      socket.emit('messageToServer', { data: 'This is from the client' })
    })
  }

  const sendMessage = (message: string) => {
    socket.emit('messsage', JSON.stringify({ message }))
    // dispatch(updateChatLog(payload))
  }

  ws = {
    connect,
    sendMessage,
  }

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
}
