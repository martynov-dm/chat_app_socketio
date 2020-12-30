import React, { createContext } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { messagesActions } from '../redux/messages/messages.actions'
import { serversActions } from '../redux/servers/servers.actions'
import { roomsActions } from '../redux/rooms/rooms.actions'

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
    socket = socketIOClient.io('/')

    socket.on('nsList', (nsData: any) => {
      dispatch(serversActions.addInitialServers(nsData))
    })
    joinNs('/wiki')
  }

  const joinNs = (endpoint: string) => {
    nsSocket = socketIOClient.io(endpoint)
    nsSocket.on('nsRoomLoad', (nsRooms: any) => {
      dispatch(roomsActions.updateRooms(nsRooms))
      joinRoom(nsRooms[0].roomTitle)
    })
  }

  const joinRoom = (roomName: string) => {
    nsSocket.emit('joinRoom', roomName)

    nsSocket.on('getUsersAmount', (usersInARoom: any) =>
      dispatch(roomsActions.updatePeopleCount(usersInARoom))
    )
  }

  const sendMessage = (message: string) => {
    nsSocket.emit('newMessageToServer', { text: message })
  }

  ws = {
    sendMessage,
    initialize,
  }

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
}
