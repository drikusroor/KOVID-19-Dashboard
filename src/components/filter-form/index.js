import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { Grid } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import {
  removeCountry,
  setCountryFilter,
  toggleShowPerCountry,
} from '../../store/filters/actions'

const useStyles = makeStyles(theme => ({
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

  const handleCountrySelectChange = event => {
    setCountryFilter(event.target.value)
  }

  const onDelete = (event, value) => {
    event.stopPropagation()
    removeCountry(value)
  }

  const handleToggleShowPerCountry = event => {
    toggleShowPerCountry(event.target.checked)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item md={8} lg={9}>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">
                Country/Region
              </InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={countryFilter}
                onChange={handleCountrySelectChange}
                input={<Input id="select-multiple-chip" />}
                defaultValue={[]}
                renderValue={selected => {
                  return (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                          onDelete={event => onDelete(event, value)}
                        />
                      ))}
                    </div>
                  )
                }}
                MenuProps={MenuProps}
              >
                {countries.map(country => (
                  <MenuItem
                    key={country}
                    value={country}
                    style={getStyles(country, countryFilter, theme)}
                  >
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
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
