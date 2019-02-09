import React, {Component} from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import TaskHeaderComponent from '../../components/tasks/TaskHeader'

import {taskSortBy} from '../../actions/tasks'

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
    const {orderBy, taskSortBy} = this.props;
    taskSortBy({
      field,
      sort: orderBy.field === field && orderBy.sort === 'asc' ? 'desc' : 'asc'
    })
  }

  handleSelectAll(){

  }

  render() {
    const { orderBy, classes, tasks } = this.props;
    return <TaskHeaderComponent
      headers = {headers}
      orderBy={orderBy}
      handleSort={field => this.handleSort(field)}
      handleSelectAll={() => this.handleSelectAll()}
    />
  }
}

const mapStateToProps = (state) => {
  // return {
  //   orderBy: state.tasks.orderBy
  // }
}

export default connect(
  mapStateToProps,
  {taskSortBy}
)(TaskHeaderContainer);