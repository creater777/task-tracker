import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default ({id, title, description, onFieldChange, handleClose, handleSubscribe}) =>
  <Dialog
    open={true}
    onClose={() => handleClose()}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">{!id ? 'Add task' : 'Edit task'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        type="text"
        onChange={event => onFieldChange('title', event)}
        value={title || ''}
        fullWidth
      />
      <TextField
        margin="dense"
        id="description"
        label="Description"
        type="text"
        onChange={event => onFieldChange('description', event)}
        value={description || ''}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClose()}>
        Cancel
      </Button>
      <Button onClick={() => handleSubscribe()} color="primary">
        Subscribe
      </Button>
    </DialogActions>
  </Dialog>