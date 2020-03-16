import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Grid } from '@material-ui/core'
import {
  removeCountry,
  setCountryFilter,
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const FilterForm = props => {
  const {
    countries,
    filters,
    handleSubmit,
    removeCountry,
    setCountryFilter,
    toggleShowPerCountry,
  } = props
  const classes = useStyles()
  const theme = useTheme()

  const {
    COUNTRY_FILTER: countryFilter,
    SHOW_PER_COUNTRY: showPerCountry,
  } = filters

  const handleCountrySelectChange = (event, value) => {
    setCountryFilter(value)
  }

  const onDelete = (event, value) => {
    event.stopPropagation()
    if (value) {
      removeCountry(value)
    } else {
      setCountryFilter([])
    }
  }

  const handleToggleShowPerCountry = event => {
    toggleShowPerCountry(event.target.checked)
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
            fullWidth
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
            />
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default compose(
  connect(state => ({}), {
    removeCountry,
    setCountryFilter,
    toggleShowPerCountry,
  }),
  reduxForm({
    form: 'FilterForm', // a unique identifier for this form
    initialValues: {
      showPerCountry: true,
    },
  }),
)(FilterForm)
