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
  let nsSocket: Socket
  let ws

  const dispatch = useDispatch()

  const initialize = () => {
    socket = socketIOClient.io('http://localhost:5000')

    socket.on('nsList', (nsData: any) => {
      dispatch(serversActions.addInitialServers(nsData))
    })

    nsSocket = socketIOClient.io('http://localhost:5000/wiki')
    nsSocket.on('nsRoomLoad', (nsRooms: any) => {
      console.log(nsRooms)
    })
  }

  //@ts-ignore
  if (!socket) {
    socket = socketIOClient.io('http://localhost:5000')
  }
  //@ts-ignore

  socket.on('messageFromServer', (dataFromServer: string) => {
    console.log(dataFromServer)
    socket.emit('messageToServer', { data: 'This is from the client' })
  })

  const sendMessage = (message: string) => {
    socket.emit('newMessageToServer', { text: message })
  }

  socket.on('messageToClients', (msg: any) => {
    dispatch(messagesActions.addNewMessage(msg.text))
  })

  ws = {
    sendMessage,
    initialize,
  }

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
}
