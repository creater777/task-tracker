import React, {Component} from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import {taskSetDialog} from '../../actions/tasks'

class TaskDialog extends Component {

  componentWillMount(){
    if (this.props.dialog.data){
      const {title, description} = this.props.dialog.data
      this.setState({ title, description })
    } else {
      this.setState({ title: null, description: null })
    }
  }

  handleClose(){
    this.props.taskSetDialog({visible: false})
  }

  handleSubscribe(){
    const
      {title, description} = this.state,
      {dialog} = this.props,
      id = dialog.data && dialog.data.id
    this.props.handleSubscribe({id, title, description})
    this.props.taskSetDialog({visible: false})
  }

  onFieldChange(field, event){
    this.setState({
      [field]: event.target.value
    })
  }

  render(){
    const {title, description} = this.state,
      {dialog} = this.props,
      id = dialog.data && dialog.data.id
    return <Dialog
      open={true}
      onClose={() => this.handleClose()}
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

const mapStateToProps = (state) =>{
  return {
    dialog: state.tasks.dialog || {}
  }
}

export default connect(
  mapStateToProps,
  {taskSetDialog}
)(TaskDialog)