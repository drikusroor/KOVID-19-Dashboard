import React from 'react'
import { change, Field, formValueSelector, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { Button, Grid, Slider, Tooltip, Box } from '@material-ui/core'
import {
  getHeaders,
  getDates,
  getInitialDates,
} from '../../store/time-series/selectors'
import { getFilterFormValues } from '../../store/form/selectors'

const useStyles = makeStyles((theme) => ({
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

const renderCheckbox = (props) => {
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

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

function ValueLabelComponent(props) {
  const { children, open, value = 'No value' } = props

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  )
}

const renderSlider = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <Slider
      aria-labelledby="discrete-slider-custom"
      valueLabelDisplay="on"
      steps={null}
      marks={custom.marks}
      getAriaLabel={custom.valueLabelFormat}
      getAriaValueText={custom.valueLabelFormat}
      min={0}
      max={custom.dates.length - 1}
      valueLabelFormat={custom.valueLabelFormat}
      ValueLabelComponent={ValueLabelComponent}
      value={input.value}
      onChange={(e, value) => input.onChange(value)}
    />
  )
}

const FilterForm = (props) => {
  const { change, countries, countryFilter, dates, filterFormValues } = props
  const classes = useStyles()

  const marks = [
    { value: 0, label: dates[0] },
    { value: dates.length - 1, label: dates[dates.length - 1] },
  ]

  const SLIDER_ENABLED = true

  const handleCountrySelectChange = (_event, value) => {
    change('countryFilter', value)
    return value
  }

  const handlePastTwoWeeks = () => {
    change('dates', [dates.length - 15, dates.length - 1])
  }

  const resetDates = () => {
    change('dates', [0, dates.length - 1])
  }

  const valuetext = (value) => {
    return dates && dates.length > 0 ? dates[value] : 'No value'
  }

  return (
    <form>
      <Grid container spacing={4} className={classes.container}>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <Autocomplete
            name="countryFilter"
            multiple
            id="tags-outlined"
            options={countries}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            value={countryFilter || []}
            onChange={handleCountrySelectChange}
            renderInput={(params) => (
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
            />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          {SLIDER_ENABLED && marks && marks.length > 0 ? (
            <Box className={classes.slider}>
              <Field
                component={renderSlider}
                name="dates"
                dates={dates}
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
        <Grid item md={2}>
          <Button onClick={handlePastTwoWeeks}>Past 2 weeks</Button>
        </Grid>
        <Grid item md={2}>
          <Button onClick={resetDates}>Reset</Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <div>
                <Field
                  name="showEstimates"
                  component={renderCheckbox}
                  label="Show estimates based on deaths"
                />
              </div>
            </Grid>
            {filterFormValues.showEstimates ? (
              <>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <div>
                    <Field
                      fullWidth
                      name="deathRate"
                      component={renderTextField}
                      label="Death rate"
                      type="number"
                      inputProps={{
                        min: '0.001',
                        max: '0.999',
                        step: '0.001',
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <div>
                    <Field
                      fullWidth
                      name="timeToDeath"
                      component={renderTextField}
                      label="Days until death"
                      type="number"
                    />
                  </div>
                </Grid>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

const selector = formValueSelector('FilterForm')
export default compose(
  connect(
    (state) => {
      return {
        countryFilter: selector(state, 'countryFilter'),
        headers: getHeaders(state),
        dates: getDates(state),
        initialValues: {
          countryFilter: [],
          deathRate: 0.014,
          timeToDeath: 17,
          showEstimates: false,
          showPerCountry: true,
          dates: getInitialDates(state),
        },
        filterFormValues: getFilterFormValues(state),
      }
    },
    {
      change,
    },
  ),
  reduxForm({
    form: 'FilterForm', // a unique identifier for this form
  }),
)(FilterForm)
