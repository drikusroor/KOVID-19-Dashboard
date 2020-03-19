import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Grid, Slider, Tooltip, Paper, Box } from '@material-ui/core'
import {
  setCountryFilter,
  setDateRange,
  toggleShowPerCountry,
} from '../../store/filters/actions'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(0.5),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  slider: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}))

const renderCheckbox = props => {
  const { input, label } = props

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value ? true : false}
            onChange={input.onChange}
          />
        }
        label={label}
      />
    </div>
  )
}

function ValueLabelComponent(props) {
  const { children, open, value } = props

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  )
}

const FilterForm = props => {
  const {
    countries,
    filters,
    handleSubmit,
    setCountryFilter,
    setDateRange,
    timeSeries,
    toggleShowPerCountry,
  } = props
  const classes = useStyles()
  const theme = useTheme()

  const { headers = [] } = (timeSeries && timeSeries[0]) || { headers: [] }

  const dates = headers.length > 4 ? headers.slice(4, headers.length) : []

  const marks = [
    { value: 0, label: dates[0] },
    { value: dates.length - 1, label: dates[dates.length - 1] },
  ]

  const {
    COUNTRY_FILTER: countryFilter,
    SHOW_PER_COUNTRY: showPerCountry,
    DATE_RANGE: dateRange,
  } = filters

  const SLIDER_ENABLED = false

  const handleCountrySelectChange = (event, value) => {
    setCountryFilter(value)
  }

  const handleToggleShowPerCountry = event => {
    toggleShowPerCountry(event.target.checked)
  }

  const handleDateRangeChange = (event, newValue) => {
    setDateRange(newValue)
  }

  const valuetext = value => {
    return dates && dates.length > 0 ? dates[value] : 'No value'
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4} className={classes.container}>
        <Grid item md={8} lg={9}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={countries}
            getOptionLabel={option => option}
            value={countryFilter}
            filterSelectedOptions
            onChange={handleCountrySelectChange}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="Country/Region"
                placeholder="Select country"
              />
            )}
          />
        </Grid>
        <Grid item md={4} lg={3}>
          <div>
            <Field
              name="showPerCountry"
              component={renderCheckbox}
              label="Combine states / provinces"
              onChange={e => handleToggleShowPerCountry(e)}
              value={showPerCountry}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          {SLIDER_ENABLED && marks && marks.length > 0 ? (
            <Box className={classes.slider}>
              <Slider
                value={dateRange}
                onChange={handleDateRangeChange}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                steps={null}
                marks={marks}
                getAriaLabel={valuetext}
                getAriaValueText={valuetext}
                min={0}
                max={dates.length - 1}
                valueLabelFormat={valuetext}
                ValueLabelComponent={ValueLabelComponent}
              />
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </form>
  )
}

export default compose(
  connect(state => ({}), {
    setCountryFilter,
    setDateRange,
    toggleShowPerCountry,
  }),
  reduxForm({
    form: 'FilterForm', // a unique identifier for this form
    initialValues: {
      showPerCountry: true,
    },
  }),
)(FilterForm)
