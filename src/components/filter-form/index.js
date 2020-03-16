import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { Grid } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import { removeCountry, setCountryFilter } from '../../store/filters/actions'

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

const renderCheckbox = ({ input, label }) => (
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

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: 'age',
        id: 'age-native-simple',
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

const FilterForm = props => {
  const {
    countries,
    countryFilter,
    handleSubmit,
    removeCountry,
    setCountryFilter,
  } = props
  const classes = useStyles()
  const theme = useTheme()

  const handleChange = event => {
    setCountryFilter(event.target.value)
  }

  const onDelete = (event, value) => {
    event.stopPropagation()
    removeCountry(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item md={9}>
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
                onChange={handleChange}
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
        <Grid item md={3}>
          <div>
            <Field
              name="perCountry"
              component={renderCheckbox}
              label="Combine states / provinces"
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
  }),
  reduxForm({
    form: 'FilterForm', // a unique identifier for this form
  }),
)(FilterForm)
