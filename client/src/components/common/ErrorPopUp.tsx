import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert as MuiAlert, AlertProps } from '@material-ui/lab/'

import { useDispatch, useSelector } from 'react-redux'
import { getErrorMessage } from '../../redux/successAndErrors/successAndErrors.selectors'
import { SuccessAndErrorsActions } from '../../redux/successAndErrors/successAndErrors.actions'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const ErrorPopUp = () => {
  const errMessage = useSelector(getErrorMessage)
  const dispatch = useDispatch()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(SuccessAndErrorsActions.removeErrorMessage())
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
