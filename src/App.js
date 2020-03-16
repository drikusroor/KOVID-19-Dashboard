import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import DataTableTabs from './components/data-table-tabs'
import { connect } from 'react-redux'
import { fetchTimeSeries } from './store/time-series/actions'
import {
  getFilteredTimeSeries,
  getCountries,
} from './store/time-series/selectors'
import FilterForm from './components/filter-form'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <br />
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Koko Koding
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function App({ countries, countryFilter, fetchTimeSeries, timeSeries }) {
  useEffect(() => {
    fetchTimeSeries()
  }, [])

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          COVID-19 histogram per country
        </Typography>
        <FilterForm countries={countries} countryFilter={countryFilter} />
        <DataTableTabs datasets={timeSeries} />
        <Copyright />
      </Box>
    </Container>
  )
}

export default connect(
  state => {
    return {
      countries: getCountries(state),
      countryFilter: state.filters.COUNTRY_FILTER || [],
      timeSeries: getFilteredTimeSeries(state),
    }
  },
  {
    fetchTimeSeries,
  },
)(App)
