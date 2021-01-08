import React, { createContext } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'

import { IMessage, IRoomData, IServerData, IUser } from '../types/types'
import { serverRoomMessageActions } from '../redux/serverRoomMessage/serverRoomMessage.actions'
import { push } from 'connected-react-router'
import { authActions } from '../redux/auth/auth.actions'

export const SocketContext = createContext(null as any)

interface Iprops {
  children: React.ReactNode
}

export const SocketProvider = (props: Iprops) => {
  const { children } = props
  const INITIAL_SERVER_ENDPOINT = '/default'

  let socket: Socket
  let ws
  let userId: string
  // let nsSocket: Socket

  const dispatch = useDispatch()

  const initialize = () => {
    socket.on('currentServerData', (currentServerData: IServerData) => {
      dispatch(serverRoomMessageActions.setCurrentServer(currentServerData))
    })
    socket.on('currentServerRoomsArr', (currentServerRoomsArr: IRoomData[]) => {
      dispatch(
        serverRoomMessageActions.setCurrentServerRoomsArr(currentServerRoomsArr)
      )
      const roomId = currentServerRoomsArr[0]._id
      socket.emit('changeRoom', { roomId, userId })
    })

    socket.on('savedMessage', (newMessage: IMessage) => {
      dispatch(serverRoomMessageActions.addNewMessage(newMessage))
    })

    socket.on('currentRoomData', (roomData: IRoomData) => {
      dispatch(serverRoomMessageActions.setCurrentRoomData(roomData))
    })

    socket.on('currentRoomUsers', (users: IUser[]) => {
      dispatch(serverRoomMessageActions.setUsers(users))
    })

    socket.on('currentRoomMessages', (messages: IMessage[]) => {
      dispatch(serverRoomMessageActions.setMessages(messages))
    })

    socket.on('usersUpdate', (users: IUser[]) => {
      dispatch(serverRoomMessageActions.setUsers(users))
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

  const joinServer = (endpoint = INITIAL_SERVER_ENDPOINT) => {
    if (socket) {
      socket.disconnect()
    }
    const token = sessionStorage.getItem('token')
    socket = socketIOClient.io(`http://localhost:5000${endpoint}`)

    socket.emit('authenticate', token)

    socket.on('not authorized', () => {
      dispatch(push('/sign-in'))
    })
    socket.on(
      'authorized',
      ({
        serversArr,
        userData,
      }: {
        serversArr: IServerData[]
        userData: IUser
      }) => {
        userId = userData._id
        dispatch(serverRoomMessageActions.setInitialServers(serversArr))
        dispatch(authActions.addUserData(userData))
        socket.emit('getServerData', endpoint)
      }
    )

    initialize()
  }

  const joinRoom = (roomId: string) => {
    socket.emit('changeRoom', { roomId, userId })
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
    joinServer,
    joinRoom,
  }

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
}
