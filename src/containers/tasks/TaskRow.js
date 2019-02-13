import React, {Component} from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles';

// import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/RemoveCircleSharp';
import ReadyIcon from '@material-ui/icons/AdjustRounded';

import {taskEdit, taskRemove} from '../../actions/tasks'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  highlight: {
    backgroundColor: lighten("rgb(0,255,0)", 0.85)
  },
});

class TaskRow extends Component {

  handleToggle(e) {
    this.props.taskEdit({
      ...this.props.item,
      index: this.props.index,
      checked: !this.props.item.checked
    })
    e.preventDefault()
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
    const {classes, item} = this.props;
    console.log('row render')
    return (
      <TableRow
        hover
        role="checkbox"
        aria-checked={!!item.checked}
        tabIndex={-1}
        key={item.id}
        selected={!!item.checked}
        className={classNames({},{
          [classes.highlight]: !!item.complete
        })}
      >
        <TableCell padding="checkbox" onClick={(e) => this.handleToggle(e)}>
          <Checkbox checked={!!item.checked}/>
        </TableCell>
        <TableCell component="th" scope="row" padding="none">{item.title}</TableCell>
        <TableCell align="left">{item.description}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="Edit" onClick={() => this.handleEdit()}>
            <EditIcon/>
          </IconButton>
          <IconButton aria-label="Remove" onClick={() => this.handleRemove()}>
            <CommentIcon/>
          </IconButton>
          <IconButton aria-label="Ready" onClick={() => this.handleComplete()}>
            <ReadyIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    item: state.tasks.items[props.index]
  }
}

export default connect(
  mapStateToProps,
  {taskEdit, taskRemove}
)(withStyles(styles)(TaskRow));