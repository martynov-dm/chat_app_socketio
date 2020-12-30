// export type TNamespace = typeof Namespace

class Namespace {
  id: number
  nsTitle: string
  img: string
  endpoint: string
  rooms: any[]

  constructor(id: number, nsTitle: string, img: string, endpoint: string) {
    this.id = id
    this.img = img
    this.nsTitle = nsTitle
    this.endpoint = endpoint
    this.rooms = []
  }

  addRoom(roomObj: any) {
    this.rooms.push(roomObj)
  }
}

export default Namespace
