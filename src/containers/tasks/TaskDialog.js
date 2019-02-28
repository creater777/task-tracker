import React, {Component} from 'react'
import { connect } from 'react-redux'

import TaskDialogComponent from '../../components/tasks/TaskDialog'
import {taskSetDialog, taskEdit, taskAdd} from '../../actions/tasks'

class TaskDialog extends Component {

  componentWillMount(){
    this.onEnter()
  }

  onEnter(){
    if (this.props.dialog.data){
      this.setState(this.props.dialog.data)
    } else {
      this.setState({title: null, description: null, status: null})
    }
  }

  handleClose(){
    this.props.taskSetDialog({visible: false})
  }

  handleSubscribe(){
    const
      {title, description, status} = this.state,
      {dialog} = this.props,
      id = dialog.data && dialog.data.id
    this.props.taskSetDialog({visible: false})
    if (id){
      this.props.taskEdit({id, title, description, status})
      return
    }
    this.props.taskAdd({title, description, status})
  }

  onFieldChange(field, value){
    this.setState({
      [field]: value
    })
  }

  render(){
    const {dialog} = this.props,
      id = dialog.data && dialog.data.id
    return <TaskDialogComponent
      onFieldChange = {this.onFieldChange.bind(this)}
      handleClose = {this.handleClose.bind(this)}
      handleSubscribe = {this.handleSubscribe.bind(this)}
      onEnter = {this.onEnter.bind(this)}
      item={{...this.state, id}}
      visible = {dialog.visible}
    />
  }
}

const mapStateToProps = (state) =>{
  return {
    dialog: state.tasks.dialog || {}
  }
}

export default connect(
  mapStateToProps,
  {taskSetDialog, taskEdit, taskAdd}
)(TaskDialog)