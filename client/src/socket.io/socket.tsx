import React, { createContext } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { IMessage, IRoomData, IServerData, IUser } from '../types/types'
import { serverRoomMessageActions } from '../redux/serverRoomMessage/serverRoomMessage.actions'
import { authActions } from '../redux/auth/auth.actions'

export const SocketContext = createContext(null as any)

interface Iprops {
  children: React.ReactNode
}

let socket: Socket
let ws

export const SocketProvider = (props: Iprops) => {
  const { children } = props
  const INITIAL_SERVER_ENDPOINT = '/default'

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
    })

    socket.on('savedMessage', (newMessage: IMessage) => {
      dispatch(serverRoomMessageActions.addNewMessage(newMessage))
    })

    socket.on('currentRoomData', (roomData: IRoomData) => {
      dispatch(serverRoomMessageActions.setCurrentRoomData(roomData))
    })

    socket.on('usersUpdate', (users: IUser[]) => {
      dispatch(serverRoomMessageActions.setUsers(users))
    })

    socket.on('currentRoomMessages', (messages: IMessage[]) => {
      dispatch(serverRoomMessageActions.setMessages(messages))
    })
    socket.on('addRoom', (room: IRoomData) => {
      dispatch(serverRoomMessageActions.addNewRoom(room))
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

  const auth = () => {
    const token = sessionStorage.getItem('token')
    socket = socketIOClient.io('/')
    socket.emit('authenticate', token)

    socket.on(
      'authorized',
      ({
        serversArr,
        userData,
      }: {
        serversArr: IServerData[]
        userData: IUser
      }) => {
        dispatch(serverRoomMessageActions.setServersArr(serversArr))
        dispatch(authActions.setUserData(userData))

        const endpoint =
          userData.currentServerEndpoint || INITIAL_SERVER_ENDPOINT

        joinServer(endpoint)
      }
    )

    socket.on('not authorized', () => {
      dispatch(push('/sign-in'))
    })
  }

  const joinServer = (endpoint: string) => {
    if (socket) {
      socket.disconnect()
    }

    socket = socketIOClient.io(`${endpoint}`)

    initialize()
  }

  const joinRoom = (newRoomId: string) => {
    socket.emit(
      'changeRoom',

      newRoomId
    )
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

  const addRoom = (roomName: string) => {
    socket.emit('addRoom', roomName)
    console.log(roomName)
  }

  ws = {
    sendMessage,
    initialize,
    joinServer,
    joinRoom,
    auth,
    addRoom,
  }

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
}
