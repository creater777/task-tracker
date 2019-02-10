import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export const DIALOG_MODE_ADD = 'add'
export const DIALOG_MODE_EDIT = 'edit'

class TaskDialog extends Component {

  componentWillMount(){
    if (this.props.dialogData){
      const {title, description} = this.props.dialogData
      this.setState({
        title,
        description
      })
    } else {
      this.setState({
        title: null,
        description: null
      })
    }
  }

  handleClose(){
    this.setState({
      title: null,
      description: null
    })
    this.props.handleClose()
  }

  handleSubscribe(){
    const {title, description} = this.state
    this.setState({
      title: null,
      description: null
    })
    this.props.handleSubscribe({title, description})
  }

  onFieldChange(field, event){
    this.setState({
      [field]: event.target.value
    })
  }

  render(){
    const {title, description} = this.state
    const {dialogMode} = this.props
    return <Dialog
      open={true}
      onClose={() => this.handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{dialogMode === DIALOG_MODE_ADD ? 'Add task' : 'Edit task'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          onChange={event => this.onFieldChange('title', event)}
          value={title || ''}
          fullWidth
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          onChange={event => this.onFieldChange('description', event)}
          value={description || ''}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => this.handleClose()}>
          Cancel
        </Button>
        <Button onClick={() => this.handleSubscribe()} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default TaskDialog