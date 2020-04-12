import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Line } from 'react-chartjs-2'
import _ from 'lodash'
import { Button, Paper, Grid } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import {
  AGG_TYPES,
  CHART_TYPES,
  setAggType,
  setChartType,
  setScaleType,
  SCALE_TYPES,
} from '../../store/chart/actions'
import BarIcon from '@material-ui/icons/BarChart'
import LineIcon from '@material-ui/icons/ShowChart'
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
  setAggType,
  setChartType,
  setScaleType,
}) {
  const classes = useStyles()
  const buttonClasses = buttonStyles()

  const { headers, data: rows } = dataset

  const logarithmic = chart.scaleType === SCALE_TYPES.LOGARITHMIC
  const line = chart.chartType === CHART_TYPES.LINE

  const labels = headers.slice(4, headers.length)
  const topRows = rows.slice(0, rows.length > 8 ? 8 : rows.length)

  const datasets = topRows.map((row, index) => {
    return {
      label: showPerCountry
        ? row[1]
        : `${row[0] ? row[0] + ', ' : ''}${row[1]}`,
      type: line ? 'line' : 'bar',
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
      <Grid container spacing={1}>
        <Grid item>
          <ToggleButtonGroup variant="contained" color="secondary" size="small">
            <ToggleButton
              component={Button}
              onClick={() =>
                chart.aggType !== AGG_TYPES.ACCUMULATIVE &&
                setAggType(AGG_TYPES.ACCUMULATIVE)
              }
              variant="contained"
              color="secondary"
              selected={chart.aggType === AGG_TYPES.ACCUMULATIVE}
              classes={buttonClasses}
              disableRipple={chart.aggType === AGG_TYPES.ACCUMULATIVE}
              disableFocusRipple={chart.aggType === AGG_TYPES.ACCUMULATIVE}
            >
              Accumulative
            </ToggleButton>
            <ToggleButton
              component={Button}
              onClick={() =>
                chart.type !== AGG_TYPES.GROWTH_NUMBER &&
                setAggType(AGG_TYPES.GROWTH_NUMBER)
              }
              variant="contained"
              color="secondary"
              selected={chart.aggType === AGG_TYPES.GROWTH_NUMBER}
              classes={buttonClasses}
              disableRipple={chart.aggType === AGG_TYPES.GROWTH_NUMBER}
              disableFocusRipple={chart.aggType === AGG_TYPES.GROWTH_NUMBER}
            >
              DoD Growth
            </ToggleButton>
            <ToggleButton
              component={Button}
              onClick={() =>
                chart.aggType !== AGG_TYPES.GROWTH_PERCENTAGE &&
                setAggType(AGG_TYPES.GROWTH_PERCENTAGE)
              }
              variant="contained"
              color="secondary"
              selected={chart.aggType === AGG_TYPES.GROWTH_PERCENTAGE}
              classes={buttonClasses}
              disableRipple={chart.aggType === AGG_TYPES.GROWTH_PERCENTAGE}
              disableFocusRipple={chart.aggType === AGG_TYPES.GROWTH_PERCENTAGE}
            >
              DoD Growth %
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup variant="contained" color="secondary" size="small">
            <ToggleButton
              component={Button}
              onClick={() =>
                chart.scaleType !== SCALE_TYPES.LINEAR &&
                setScaleType(SCALE_TYPES.LINEAR)
              }
              variant="contained"
              color="secondary"
              selected={chart.scaleType === SCALE_TYPES.LINEAR}
              classes={buttonClasses}
              disableRipple={chart.scaleType === SCALE_TYPES.LINEAR}
              disableFocusRipple={chart.scaleType === SCALE_TYPES.LINEAR}
            >
              Linear
            </ToggleButton>
            <ToggleButton
              component={Button}
              onClick={() =>
                chart.scaleType !== SCALE_TYPES.LOGARITHMIC &&
                setScaleType(SCALE_TYPES.LOGARITHMIC)
              }
              variant="contained"
              color="secondary"
              selected={chart.scaleType === SCALE_TYPES.LOGARITHMIC}
              classes={buttonClasses}
              disableRipple={chart.scaleType === SCALE_TYPES.LOGARITHMIC}
              disableFocusRipple={chart.scaleType === SCALE_TYPES.LOGARITHMIC}
            >
              Logarithmic
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup variant="contained" color="secondary" size="small">
            <ToggleButton
              component={Button}
              onClick={() =>
                chart.chartType !== CHART_TYPES.BAR &&
                setChartType(CHART_TYPES.BAR)
              }
              variant="contained"
              color="secondary"
              selected={chart.chartType === CHART_TYPES.BAR}
              classes={buttonClasses}
              disableRipple={chart.chartType === CHART_TYPES.BAR}
              disableFocusRipple={chart.chartType === CHART_TYPES.BAR}
            >
              <BarIcon />
            </ToggleButton>
            <ToggleButton
              component={Button}
              onClick={() =>
                chart.chartType !== CHART_TYPES.LINE &&
                setChartType(CHART_TYPES.LINE)
              }
              variant="contained"
              color="secondary"
              selected={chart.chartType === CHART_TYPES.LINE}
              classes={buttonClasses}
              disableRipple={chart.chartType === CHART_TYPES.LINE}
              disableFocusRipple={chart.chartType === CHART_TYPES.LINE}
            >
              <LineIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

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
    setAggType,
    setChartType,
    setScaleType,
  },
)(PureChart)
