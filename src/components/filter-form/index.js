import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Grid } from '@material-ui/core'
import {
  setCountryFilter,
  setDeathRate,
  setTimeToDeath,
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

const FilterForm = props => {
  const {
    countries,
    filters,
    handleSubmit,
    setCountryFilter,
    setDeathRate,
    setTimeToDeath,
    toggleShowPerCountry,
  } = props
  const classes = useStyles()
  const theme = useTheme()

  const {
    COUNTRY_FILTER: countryFilter,
    DEATH_RATE: deathRate,
    TIME_TO_DEATH: timeToDeath,
    SHOW_PER_COUNTRY: showPerCountry,
  } = filters

  const handleCountrySelectChange = (_event, value) => {
    setCountryFilter(value)
  }

  const handleToggleShowPerCountry = event => {
    toggleShowPerCountry(event.target.checked)
  }

  const handleChangeDeathRate = (_event, value) => {
    setDeathRate(value)
  }
  const handleChangeTimeToDeath = (_event, value) => {
    setTimeToDeath(value)
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
        <Grid item md={4} lg={2}>
          <div>
            <Field
              fullWidth
              name="deathRate"
              component={renderTextField}
              label="Death rate"
              onChange={handleChangeDeathRate}
              value={deathRate}
              type="number"
            />
          </div>
        </Grid>
        <Grid item md={4} lg={2}>
          <div>
            <Field
              fullWidth
              name="timeToDeath"
              component={renderTextField}
              label="Days until death"
              onChange={handleChangeTimeToDeath}
              value={timeToDeath}
              type="number"
            />
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default compose(
  connect(state => ({}), {
    setCountryFilter,
    setDeathRate,
    setTimeToDeath,
    toggleShowPerCountry,
  }),
  reduxForm({
    form: 'FilterForm', // a unique identifier for this form
    initialValues: {
      deathRate: 0.014,
      timeToDeath: 17,
      showPerCountry: true,
    },
  }),
)(FilterForm)
