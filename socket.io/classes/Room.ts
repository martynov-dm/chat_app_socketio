class Room {
  roomId: number
  namespace: string
  isPrivate: boolean
  roomTitle: string
  history: any[]

  constructor(
    roomId: number,
    roomTitle: string,
    namespace: string,
    isPrivate = false
  ) {
    this.roomId = roomId
    this.roomTitle = roomTitle
    this.namespace = namespace
    this.isPrivate = isPrivate
    this.history = []
  }

  addMessage(message: string) {
    this.history.push(message)
  }
  clearHistory() {
    this.history = []
  }
}

export default Room
