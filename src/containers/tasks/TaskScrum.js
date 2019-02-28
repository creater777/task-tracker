import React, {Component} from 'react'
import {connect} from 'react-redux'
import {statuses, colors} from '../../config'
import { Container, Draggable } from 'react-smooth-dnd';
import { withStyles } from '@material-ui/core/styles'
import {lime} from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {taskEdit} from '../../actions/tasks'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 6,
    padding: theme.spacing.unit,
    textAlign: 'left',
  },

  textHover: {
    margin: 6,
    padding: theme.spacing.unit,
    marginBottom: '-3rem',
    fontWeight: 'bold',
    textAlign: 'left'
  }
});

const DragItem = ({classes, item, bgColor}) =>
  <Paper
    style={{backgroundColor: bgColor}}
    key={item.id}
    className={classes.paper}
  >
    <Typography gutterBottom variant="subtitle1">{item.title}</Typography>
    <Typography color="textSecondary">{item.description}</Typography>
  </Paper>


class TaskScrum extends Component {

  shouldAcceptDrop({groupName}){
    return groupName !== this.groupName
  }

  getChildPayload(key, index){
    const {group} = this.props
    return group[key][index]
  }

  onDrop({addedIndex, payload}, status){
    if (addedIndex === null){
      return
    }
    const {taskEdit} = this.props
    taskEdit({...payload, status})
  }

  render(){
    const
      {classes, group} = this.props,
      statusKeys = Object.keys(statuses)
    let index = 0
    return <div className={classes.root}>
      <Grid container>
        {statusKeys.map((key, column) =>
          <Grid key={key} item xs={12 / statusKeys.length}>
            <Typography variant="subtitle1" gutterBottom className={classes.textHover} hover={classes.textHover}>
              {statuses[key].title}
            </Typography>
            <Container
              key={key}
              groupName={key}
              orientation="vertical"
              removeOnDropOut={true}
              shouldAcceptDrop={this.shouldAcceptDrop}
              getChildPayload={index => this.getChildPayload(key, index)}
              onDrop={e => this.onDrop(e, key)}
              style={{
                paddingTop: '3rem'
              }}
            >
              {group[key] && group[key].map((item, i) => {
                index++
                return <Draggable key={`item-${index}`} index={item.id}>
                  <DragItem
                    bgColor={statuses[key].color}
                    item={item}
                    classes={classes}
                  />
                </Draggable>
              })}
            </Container>
          </Grid>
        )}
      </Grid>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  const group = {}
  state.tasks.items.forEach(item => {
    const key = item.status || 'planed'
    !group[key] && (group[key]=[])
    group[key].push(item)
  })
  return {
    group
  }
}

export default withStyles(styles)(connect(
  mapStateToProps,
  {taskEdit}
)(TaskScrum))