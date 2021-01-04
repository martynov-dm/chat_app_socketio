import React, { createContext } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'

import { IMessage, IRoomData, IServerData, IUser } from '../types/types'
import { serverRoomMessageActions } from '../redux/serverRoomMessage/serverRoomMessage.actions'
import { selectUserId } from '../redux/auth/auth.selectors'
import { push } from 'connected-react-router'

export const SocketContext = createContext(null as any)

interface Iprops {
  children: React.ReactNode
}

export const SocketProvider = (props: Iprops) => {
  const { children } = props
  const INITIAL_SERVER_ID = '5fef4e9ebc24d12320434c00'

  let socket: Socket
  let ws
  // let nsSocket: Socket

  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)

  const initialize = () => {
    const token = sessionStorage.getItem('token')
    socket = socketIOClient.io('http://localhost:5000/test1')

    socket.emit('authenticate', token)

    socket.on('not signed', () => {
      // dispatch(push('/sign-in'))
    })

    socket.on('serversArr', (serversArr: IServerData[]) => {
      dispatch(serverRoomMessageActions.addInitialServers(serversArr))
    })

    socket.emit('joinServer', INITIAL_SERVER_ID)

    socket.on('currentServerData', (currentServerData: IServerData) => {
      dispatch(serverRoomMessageActions.addCurrentServer(currentServerData))

      const roomId = currentServerData.rooms[0]._id
      socket.emit('joinRoom', { roomId, userId })
    })

    socket.on('savedMessage', (newMessage: IMessage) => {
      dispatch(serverRoomMessageActions.addNewMessage(newMessage))
    })

    socket.on('currentRoomData', (currentRoomData: IRoomData) => {
      dispatch(serverRoomMessageActions.addCurrentRoomData(currentRoomData))
    })

    socket.on('usersUpdate', (users: IUser[]) => {
      dispatch(serverRoomMessageActions.updateUsers(users))
    })

    // socket.on('currentServerData', (currentServerData: IServerData) => {
    //   dispatch(serversActions.updateCurrentServer(currentServerData))
    //   dispatch(roomsActions.updateCurrentRoom(currentServerData.rooms[0]))
    // })

    // if (!currentServer) {
    //   joinNs('/wiki')
    // } else {
    //   joinNs(currentServer)
    // }
  }

  // const joinNs = (endpoint: string) => {
  //   if (nsSocket) nsSocket.close()

  //   nsSocket = socketIOClient.io(endpoint)

  //   nsSocket.on('nsRoomLoad', (nsRooms: any) => {
  //     dispatch(roomsActions.updateRooms(nsRooms))
  //     // joinRoom(nsRooms[0].roomTitle)
  //   })

  //   nsSocket.on('messageToClients', (msg: string) => {
  //     dispatch(messagesActions.addNewMessage(msg))
  //   })
  // }

  const joinRoom = (roomId: string) => {
    socket.emit('joinRoom', { roomId, userId })
    // dispatch(roomsActions.updateCurrentRoomName(roomName))

    // socket.on('updateMembers', (usersInARoom: any) =>
    //   dispatch(roomsActions.updatePeopleCount(usersInARoom))
    // )

    // socket.on('historyCatchUp', (history: any) => {
    //   dispatch(messagesActions.addHistory(history))
    //   // console.log(history)
    // })
  }

  const sendMessage = (message: string, userId: string, roomId: string) => {
    socket.emit('newMessageToServer', { message, userId, roomId })
  }

  ws = {
    sendMessage,
    initialize,
    // joinNs,
    joinRoom,
  }

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
}
