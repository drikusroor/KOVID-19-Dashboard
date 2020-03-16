import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  tableContainer: {
    width: '100%',
    maxHeight: 480,
    overflow: 'auto',
  },
  table: {
    minWidth: 650,
  },
})

export default function DataTable({ dataset: { headers, data: rows, total } }) {
  const classes = useStyles()
  if (!rows || rows.length < 1) return null

  return (
    <Paper className={classes.tableContainer}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index} component="th" scope="row">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {total
            ? total.map((row, index) => (
                <TableRow key={index}>
                  {row.map((cell, index) => (
                    <TableCell key={index} component="th" scope="row">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </Paper>
  )
}
