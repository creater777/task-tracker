import React, {Component} from 'react';
import {connect} from 'react-redux'

import TaskRowComponent from '../../components/tasks/TaskRow'
// import PropTypes from 'prop-types';

import {taskEdit, taskRemove} from '../../actions/tasks'

class TaskRow extends Component {

  handleToggle() {
    this.props.taskEdit({
      ...this.props.item,
      index: this.props.index,
      checked: !this.props.item.checked
    })
  }

  handleComplete() {
    this.props.taskEdit({
      ...this.props.item,
      index: this.props.index,
      complete: !this.props.item.complete
    })
  }

  handleRemove() {
    this.props.taskRemove([this.props.item.id])
  }

  handleEdit() {
    this.props.handleEdit(this.props.id)
  }

  render() {
    const {item} = this.props;
    console.log('row render')
    return <TaskRowComponent
      item={item}
      handleToggle={() => this.handleToggle()}
      handleComplete={() => this.handleComplete()}
      handleRemove={() => this.handleRemove()}
      handleEdit={() => this.handleEdit()}
    />
  }
}

const mapStateToProps = (state, props) => {
  const index = state.tasks.items.findIndex(item => item.id === props.id)
  return {
    item: state.tasks.items[index]
  }
}

export default connect(
  mapStateToProps,
  {taskEdit, taskRemove}
)(TaskRow);