import React, {Component} from 'react'
import {connect} from 'react-redux'

// import PropTypes from 'prop-types'
import TaskToolbar from '../../components/tasks/TaskToolbar'

import {taskRemove} from '../../actions/tasks'

class TaskList extends Component {

  handleRemoveItems() {
    this.props.taskRemove(this.props.selected)
  }

  render() {
    const {selected} = this.props
    return <TaskToolbar
      numSelected={selected.length}
      handleRemove={() => this.handleRemoveItems()}
    />

  }
}

const mapStateToProps = (state, props) => {
  const
    {items, pagination} = state.tasks,
    {page, rowsPerPage} = pagination,
    tasksOnPage = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    selected = tasksOnPage.filter(item => item.checked)
  return {
    selected
  }
}

export default connect(
  mapStateToProps,
  {taskRemove}
)(TaskList)