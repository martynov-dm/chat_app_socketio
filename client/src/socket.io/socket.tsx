import React, { createContext } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { messagesActions } from '../redux/messages/messages.actions'
import { serversActions } from '../redux/servers/servers.actions'

export const SocketContext = createContext(null as any)

interface Iprops {
  children: React.ReactNode
}

export const SocketProvider = (props: Iprops) => {
  const { children } = props
  let socket: Socket
  let ws

  const dispatch = useDispatch()
  //@ts-ignore
  if (!socket) {
    socket = socketIOClient.io('http://localhost:5000')

    socket.on('nsList', (nsData: any) => {
      dispatch(serversActions.addInitialServers(nsData))
    })

    // socket.connect()
    socket.on('messageFromServer', (dataFromServer: string) => {
      console.log(dataFromServer)
      socket.emit('messageToServer', { data: 'This is from the client' })
    })
  }

  const sendMessage = (message: string) => {
    socket.emit('newMessageToServer', { text: message })
  }

  socket.on('messageToClients', (msg: any) => {
    dispatch(messagesActions.addNewMessage(msg.text))
  })

  ws = {
    sendMessage,
  }

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
}
