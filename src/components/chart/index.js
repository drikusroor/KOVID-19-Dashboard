import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Line } from 'react-chartjs-2'
import _ from 'lodash'
import { Button, Paper } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import {
  CHART_TYPES,
  setGrowthNumber,
  setLinear,
  setLogarithmic,
} from '../../store/chart/actions'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(),
  },
}))

const buttonStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: `${theme.palette.secondary.dark} !important`,
    },
  },
  selected: {
    backgroundColor: `${theme.palette.secondary.dark} !important`,
  },
  label: {
    color: '#fff',
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

export function PureChart({
  chart,
  dataset,
  filters: { showPerCountry },
  setGrowthNumber,
  setLinear,
  setLogarithmic,
}) {
  const classes = useStyles()
  const buttonClasses = buttonStyles()

  const { headers, data: rows } = dataset

  const logarithmic = chart.type === CHART_TYPES.LOGARITHMIC

  const labels = headers.slice(4, headers.length)
  const topRows = rows.slice(0, rows.length > 8 ? 8 : rows.length)

  const datasets = topRows.map((row, index) => {
    return {
      label: showPerCountry
        ? row[1]
        : `${row[0] ? row[0] + ', ' : ''}${row[1]}`,
      type: 'line',
      data: row.slice(4, row.length).map((value) => parseInt(value)),
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
      <ToggleButtonGroup variant="contained" color="secondary" size="small">
        <ToggleButton
          component={Button}
          onClick={() => chart.type !== CHART_TYPES.LINEAR && setLinear()}
          variant="contained"
          color="secondary"
          selected={chart.type === CHART_TYPES.LINEAR}
          classes={buttonClasses}
          disableRipple={chart.type === CHART_TYPES.LINEAR}
          disableFocusRipple={chart.type === CHART_TYPES.LINEAR}
        >
          Show linear
        </ToggleButton>
        <ToggleButton
          component={Button}
          onClick={() =>
            chart.type !== CHART_TYPES.LOGARITHMIC && setLogarithmic()
          }
          variant="contained"
          color="secondary"
          selected={chart.type === CHART_TYPES.LOGARITHMIC}
          classes={buttonClasses}
          disableRipple={chart.type === CHART_TYPES.LOGARITHMIC}
          disableFocusRipple={chart.type === CHART_TYPES.LOGARITHMIC}
        >
          Show logarithmic
        </ToggleButton>
        <ToggleButton
          component={Button}
          onClick={() =>
            chart.type !== CHART_TYPES.GROWTH_NUMBER && setGrowthNumber()
          }
          variant="contained"
          color="secondary"
          selected={chart.type === CHART_TYPES.GROWTH_NUMBER}
          classes={buttonClasses}
          disableRipple={chart.type === CHART_TYPES.GROWTH_NUMBER}
          disableFocusRipple={chart.type === CHART_TYPES.GROWTH_NUMBER}
        >
          Show growth numbers
        </ToggleButton>
      </ToggleButtonGroup>
      <Line data={data} options={options} height={480} />
    </Paper>
  )
}

export default connect(
  (state) => {
    return {
      chart: state.chart,
    }
  },
  {
    setGrowthNumber,
    setLinear,
    setLogarithmic,
  },
)(PureChart)
