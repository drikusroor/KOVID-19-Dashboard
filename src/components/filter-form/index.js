import React from 'react'
import { change, Field, formValueSelector, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Grid } from '@material-ui/core'
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
  const { change, countries, countryFilter } = props
  const classes = useStyles()

  const handleCountrySelectChange = (_event, value) => {
    change('countryFilter', value)
    return value
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
            getOptionLabel={option => option}
            filterSelectedOptions
            value={countryFilter || []}
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
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
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
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <div>
                <Field
                  name="showEstimates"
                  component={renderCheckbox}
                  label="Show estimates based on deaths"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

const selector = formValueSelector('FilterForm')
export default compose(
  connect(
    state => {
      return {
        countryFilter: selector(state, 'countryFilter'),
      }
    },
    {
      change,
    },
  ),
  reduxForm({
    form: 'FilterForm', // a unique identifier for this form
    initialValues: {
      countryFilter: [],
      deathRate: 0.014,
      timeToDeath: 17,
      showEstimates: false,
      showPerCountry: true,
    },
  }),
)(FilterForm)
