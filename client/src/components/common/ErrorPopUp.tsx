import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert as MuiAlert, AlertProps } from '@material-ui/lab/'

import { useDispatch } from 'react-redux'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

interface Iprops {
  errMessage: string | null
  clearAction: () => { type: string }
}

const ErrorPopUp: React.FC<Iprops> = (props) => {
  const { errMessage, clearAction } = props

  const dispatch = useDispatch()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(clearAction())
  }

  return (
    <Snackbar open={!!errMessage} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error'>
        {errMessage}
      </Alert>
    </Snackbar>
  )
}

export default ErrorPopUp
