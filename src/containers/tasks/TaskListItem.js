import React, {Component} from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
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

class TaskListItem extends Component {

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
    this.props.taskRemove({
      index: this.props.index
    })
  }

  render() {
    const { item } = this.props;
    console.log('render')
    return (
      <ListItem key={item.id} role={undefined} dense button
                onClick={() => this.handleToggle()}>
        <Checkbox
          checked={!!item.checked}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={`Line item ${item.id}`}/>
        <ListItemSecondaryAction>
          <IconButton aria-label="Remove" onClick={() => this.handleRemove()}>
            <CommentIcon/>
          </IconButton>
          <IconButton aria-label="Ready" onClick={() => this.handleComplete()}>
            <ReadyIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
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
)(withStyles(styles)(TaskListItem)
);