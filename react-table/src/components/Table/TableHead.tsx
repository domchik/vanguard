import { MouseEventHandler, MouseEvent } from 'react'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'
import { cells } from './cells'

const TableHead = ({
                     order = 'asc',
                     orderBy = 'name',
                     onRequestSort,
                     // eslint-disable-next-line @typescript-eslint/no-unused-vars
                     onSelectAllClick,
                     // eslint-disable-next-line @typescript-eslint/no-unused-vars
                     rowCount,
                     // eslint-disable-next-line @typescript-eslint/no-unused-vars
                     numSelected,
                   }: {
  order?: 'asc' | 'desc'
  orderBy?: string
  onRequestSort: (event: MouseEvent, property: string) => void
  rowCount: number
  numSelected: number
  onSelectAllClick: (e: any) => void
}) => {
  const createSortHandler =
    (property: string): MouseEventHandler<HTMLButtonElement> =>
      (event) => {
        onRequestSort(event, property)
      }


  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={numSelected === rowCount && rowCount > 0} onClick={onSelectAllClick} />
        </TableCell>

        {cells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}
export default TableHead
