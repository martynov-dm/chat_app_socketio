import { IUser } from '../../types/types'

export const removeUserFromArr = (oldArray: IUser[], user: IUser) => {
  const index = oldArray.findIndex(
    (userInOldArr) => userInOldArr._id == user._id
  )

  const newArray = oldArray.slice()
  newArray.splice(index, 1)
  return newArray
}
