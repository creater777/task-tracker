import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

export default withStyles(styles)((
  {
    handleSelectAll,
    handleSort,
    headers,
    orderBy,
    numSelected,
    rowCount,
    classes
  }) =>
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={handleSelectAll}
        />
      </TableCell>
      {headers.map(item =>
        <TableCell
          key={item.id}
          align={item.numeric ? 'right' : 'left'}
          padding={item.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy.field === item.id ? orderBy.desk : false}
        >
          <Tooltip
            title="Sort"
            placement={item.numeric ? 'bottom-end' : 'bottom-start'}
            enterDelay={300}
          >
            <TableSortLabel
              active={orderBy.field === item.id}
              direction={orderBy.sort}
              onClick={() => handleSort(item.id)}
            >
              {item.label}
            </TableSortLabel>
          </Tooltip>
        </TableCell>
      )}
      <TableCell />
    </TableRow>
  </TableHead>
)