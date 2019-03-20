import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {statuses} from '../../config'

import TaskRowComponent from '../../components/tasks/TaskRow'

import {taskEdit, taskRemove} from '../../actions/tasks'

class TaskRow extends Component {

  handleToggle() {
    this.props.taskEdit({
      ...this.props.item,
      index: this.props.index,
      checked: !this.props.item.checked
    })
  }

  handleRemove() {
    this.props.taskRemove([this.props.item.id])
  }

  handleEdit() {
    this.props.handleEdit(this.props.id)
  }

  render() {
    const {item} = this.props,
      color = statuses[item.status] && statuses[item.status].color
    return <TaskRowComponent
      item={item}
      color={color}
      handleToggle={this.handleToggle.bind(this)}
      handleRemove={this.handleRemove.bind(this)}
      handleEdit={this.handleEdit.bind(this)}
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

TaskRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number]
    ),
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    checked: PropTypes.bool
  }).isRequired
}