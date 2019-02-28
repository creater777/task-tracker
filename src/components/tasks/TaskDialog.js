import React from 'react'
import {statuses} from '../../config'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

export default ({visible, onEnter, item, onFieldChange, handleClose, handleSubscribe}) =>
  <Dialog
    open={!!visible}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
    onEnter = {onEnter}
  >
    <DialogTitle id="form-dialog-title">{!item.id ? 'Add task' : 'Edit task'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        type="text"
        onChange={event => onFieldChange('title', event.target.value)}
        value={item.title || ''}
        fullWidth
      />
      <TextField
        margin="dense"
        id="description"
        label="Description"
        type="text"
        onChange={event => onFieldChange('description', event.target.value)}
        value={item.description || ''}
        fullWidth
      />
      <FormControl>
        <InputLabel htmlFor="statusSelect">Status</InputLabel>
        <Select
          inputProps={{
            name: 'status',
            id: 'statusSelect',
          }}
          value={item.status || 'planed'}
          onChange={e => onFieldChange('status', e.target.value)}
        >
          {Object.keys(statuses).map(index =>
            <MenuItem
              key={index}
              selected={index === item.status}
              value={index}>{statuses[index].title}
            </MenuItem>
          )}
        </Select>
      </FormControl>
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