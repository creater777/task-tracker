import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default ({login, onFieldChange, handleSubscribe}) =>
  <Dialog
    open={true}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Login page</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="login"
        label="Login"
        type="text"
        onChange={event => onFieldChange(event.target.value)}
        value={login || ''}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleSubscribe()} color="primary">
        Subscribe
      </Button>
    </DialogActions>
  </Dialog>