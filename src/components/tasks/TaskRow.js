import React from 'react';
import {withStyles} from '@material-ui/core/styles'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import CommentIcon from '@material-ui/icons/RemoveCircleSharp'
import {lighten} from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  highlight: {
    backgroundColor: lighten("rgb(0,255,0)", 0.85)
  },
});

export default withStyles(styles)(
  ({
     classes,
     item,
     color,
     handleEdit,
     handleRemove,
     handleToggle
   }) =>
    <TableRow
      hover
      role="checkbox"
      aria-checked={!!item.checked}
      tabIndex={-1}
      key={item.id}
      selected={!!item.checked}
      style={{
        background: color
      }}
    >
      <TableCell padding="checkbox" onClick={handleToggle}>
        <Checkbox checked={!!item.checked}/>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">{item.title}</TableCell>
      <TableCell align="left">{item.description}</TableCell>
      <TableCell align="right">
        <Tooltip title="Edit">
          <IconButton aria-label="Edit" onClick={handleEdit}>
            <EditIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove">
          <IconButton aria-label="Remove" onClick={handleRemove}>
            <CommentIcon/>
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
)