import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Line } from 'react-chartjs-2'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({}))

export default function LineGraph({ dataset }) {
  const classes = useStyles()

  const labels = dataset[0].slice(4, dataset[0].length)
  const rows = dataset.slice(1, dataset.length > 25 ? 25 : dataset.length)

  const datasets = rows.map(row => {
    return {
      label: row[1],
      type: 'line',
      data: row.slice(4, row.length).map(value => parseInt(value)),
    }
  })

  const data = { labels, datasets }

  if (!data) return null

  return (
    <div className={classes.root}>
      <Line data={data} height={480} options={{ maintainAspectRatio: false }} />
    </div>
  )
}
