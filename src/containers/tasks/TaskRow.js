import React, {Component} from 'react';
import {connect} from 'react-redux'
// import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/RemoveCircleSharp';
import ReadyIcon from '@material-ui/icons/AdjustRounded';


import {taskEdit, taskRemove} from '../../actions/tasks'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
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
    this.props.taskRemove({
      index: this.props.index
    })
  }

  render() {
    const {item} = this.props;
    return (
      <TableRow
        hover
        onClick={(e) => this.handleToggle(e)}
        role="checkbox"
        aria-checked={!!item.checked}
        tabIndex={-1}
        key={item.id}
        selected={!!item.checked}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={!!item.checked}/>
        </TableCell>
        <TableCell component="th" scope="row" padding="none">{item.title}</TableCell>
        <TableCell align="left">{item.description}</TableCell>
        <TableCell align="right">
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