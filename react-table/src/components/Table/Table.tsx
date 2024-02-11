import { FormEvent, MouseEvent, useState } from 'react'
import Box from '@mui/material/Box'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import TableHead from './TableHead'
import TableToolbar from './TableToolbar'
import { Row } from '../../db/model'
import { Button } from '@mui/material'

const Table = ({ rows, performSort, performDelete }: {
  rows: Row[]
  performSort: (columnName: keyof Row) => void,
  performDelete: (rows: Row[]) => void
}) => {

  const [selectedRows, setSelectedRows] = useState([] as Row[]);
  const handleRequestSort = (_event: MouseEvent, property: string) => {
    performSort(property as keyof Row)
  }
  const handleSelectAllClick = (e: any) => {
      if (e.target.checked) {
        setSelectedRows(rows);
      } else {
        setSelectedRows([]);
      }
  }

  const handleClick = (event: MouseEvent, name: string) => {
    console.log('event', event, 'name', name)
  }

  const handleChkChange = (event: FormEvent<HTMLInputElement>, row: Row) => {
    setSelectedRows((prevSelected: Row[]) => {
      const isSelected = prevSelected.some((r) => r.id === row.id);

      return isSelected
        ? prevSelected.filter((r) => r.id !== row.id)
        : [...prevSelected, row];
    });
  };


  const handleDeleteSelected = () => {
    const deletedRows = selectedRows.filter((r) => {
      return rows.find((row) => row.id === r.id)
    })
    performDelete(deletedRows)
    setSelectedRows([])
  }

  const isSelected = (row: Row) => {
    return selectedRows.some((r) => {
      return r.id === row.id
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={0} />
        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={selectedRows.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row) => {
                const isItemSelected = isSelected(row)
                return (
                  <TableRow
                    hover
                    onClick={(event: MouseEvent) =>
                      handleClick(event, row.name)
                    }
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary"  checked={isItemSelected} onChange={(event) =>  handleChkChange(event,row)} />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Paper>
      <Button variant="contained" disabled={selectedRows.length === 0} onClick={handleDeleteSelected}>Delete selected
        rows</Button>
    </Box>
  )
}

export default Table
