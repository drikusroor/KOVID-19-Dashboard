import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Line } from 'react-chartjs-2'
import _ from 'lodash'
import { Paper, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(),
  },
}))

const colors = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
]

export default function LineGraph({ dataset, filters: { showPerCountry } }) {
  const classes = useStyles()

  const { headers, data: rows } = dataset

  const [logarithmic, setLogarithmic] = useState(false)

  const labels = headers.slice(4, headers.length)
  const topRows = rows.slice(0, rows.length > 8 ? 8 : rows.length)

  const datasets = topRows.map((row, index) => {
    return {
      label: showPerCountry
        ? row[1]
        : `${row[0] ? row[0] + ', ' : ''}${row[1]}`,
      type: 'line',
      data: row.slice(4, row.length).map(value => parseInt(value)),
      borderColor: colors[index],
    }
  })

  const data = { labels, datasets }
  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          type: logarithmic ? 'logarithmic' : 'linear',
        },
      ],
    },
  }

  if (!data) return null

  return (
    <Paper className={classes.root}>
      <Button
        onClick={() => setLogarithmic(!logarithmic)}
        variant="contained"
        color="secondary"
      >
        Show {logarithmic ? 'linear' : 'logaritmic'}
      </Button>
      <Line data={data} options={options} height={480} />
    </Paper>
  )
}
