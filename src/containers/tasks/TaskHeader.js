import React, {Component} from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import TaskHeaderComponent from '../../components/tasks/TaskHeader'

import {taskSortBy, taskSelect} from '../../actions/tasks'

const headers = [
  {
    id: 'title',
    label: 'Title'
  },
  {
    id: 'description',
    label: 'Description'
  }
]

class TaskHeaderContainer extends Component {
  handleSort(field){
    const {orderBy, pagination, taskSortBy} = this.props;
    taskSortBy({
      field,
      sort: orderBy.field === field && orderBy.sort === 'asc' ? 'desc' : 'asc'
    })
  }

  handleSelectAll(){
    const { selected, tasksOnPage, taskSelect} = this.props
    console.log(selected, tasksOnPage)
    taskSelect({
      ids: tasksOnPage.map(item => item.id),
      value: selected.length !== tasksOnPage.length
    })
  }

  render() {
    const { orderBy, selected, tasksOnPage } = this.props;
    return <TaskHeaderComponent
      headers = {headers}
      orderBy={orderBy}
      handleSort={field => this.handleSort(field)}
      handleSelectAll={() => this.handleSelectAll()}
      numSelected = {selected.length}
      rowCount = {tasksOnPage.length}
    />
  }
}

const mapStateToProps = (state) => {
  const
    {pagination} = state.tasks,
    {page, rowsPerPage} = pagination,
    tasksOnPage = state.tasks.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return {
    tasksOnPage,
    selected: tasksOnPage.filter(item => item.checked),
    orderBy: state.tasks.orderBy
  }
}

export default connect(
  mapStateToProps,
  {taskSortBy, taskSelect}
)(TaskHeaderContainer);