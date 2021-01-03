import React, { createContext } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'

import { IRoomData, IServerData } from '../types/types'
import { serverRoomMessageActions } from '../redux/serverRoomMessage/serverRoomMessage.actions'

export const SocketContext = createContext(null as any)

interface Iprops {
  children: React.ReactNode
}

export const SocketProvider = (props: Iprops) => {
  const { children } = props
  const INITIAL_SERVER_ID = '5fef4e9ebc24d12320434c00'

  let socket: Socket
  // let nsSocket: Socket
  let ws

  const dispatch = useDispatch()
  // const currentServer = useSelector(selectCurrentServer)

  const initialize = () => {
    socket = socketIOClient.io('http://localhost:5000/test1')

    socket.on('serversArr', (serversArr: IServerData[]) => {
      dispatch(serverRoomMessageActions.addInitialServers(serversArr))
    })

    socket.emit('joinServer', INITIAL_SERVER_ID)
    socket.on('currentServerData', (currentServerData: IServerData) => {
      dispatch(serverRoomMessageActions.addCurrentServer(currentServerData))

      const roomId = currentServerData.rooms[0]._id
      socket.emit('joinRoom', roomId)
    })

    socket.on('currentRoomDataUpdate', (currentRoomData: IRoomData) => {
      dispatch(serverRoomMessageActions.addCurrentRoomData(currentRoomData))
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

  // const joinRoom = (roomName: string) => {
  //   nsSocket.emit('joinRoom', roomName)
  //   dispatch(roomsActions.updateCurrentRoomName(roomName))

  //   nsSocket.on('updateMembers', (usersInARoom: any) =>
  //     dispatch(roomsActions.updatePeopleCount(usersInARoom))
  //   )

  //   nsSocket.on('historyCatchUp', (history: any) => {
  //     dispatch(messagesActions.addHistory(history))
  //     // console.log(history)
  //   })
  // }

  const sendMessage = (message: string, userId: string) => {
    socket.emit('newMessageToServer', { message, userId })
  }

  ws = {
    sendMessage,
    initialize,
    // joinNs,
    // joinRoom,
  }

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
}
