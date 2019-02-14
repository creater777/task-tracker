import React, {Component} from 'react'
import { connect } from 'react-redux'

import TaskDialogComponent from '../../components/tasks/TaskDialog'
import {taskSetDialog} from '../../actions/tasks'

class TaskDialog extends Component {

  componentWillMount(){
    this.onEnter()
  }

  onEnter(){
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
    return <TaskDialogComponent
      onFieldChange = {(field, event) => this.onFieldChange(field, event)}
      handleClose = {() => this.handleClose()}
      handleSubscribe = {() => this.handleSubscribe()}
      onEnter = {() => this.onEnter()}
      id = {id}
      title = {title}
      visible = {dialog.visible}
      description = {description}
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
  {taskSetDialog}
)(TaskDialog)