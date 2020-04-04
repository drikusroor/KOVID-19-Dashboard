import { Layout } from '../../components/layout'
import React, { useEffect } from 'react'
import DataTableTabs from '../../components/data-table-tabs'
import { connect } from 'react-redux'
import { fetchTimeSeries } from '../../store/time-series/actions'
import {
  getFilteredTimeSeries,
  getCountries,
} from '../../store/time-series/selectors'
import { getFilterFormValues } from '../../store/form/selectors'
import FilterForm from '../../components/filter-form'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const ChartPage = ({
  countries,
  initialFilters,
  filters,
  fetchTimeSeries,
  loading,
  timeSeries,
}) => {
  const { type } = useParams()
  useEffect(() => {
    fetchTimeSeries(type)
  }, [])

  return (
    <Layout title="COVID-19 histogram per country">
      {timeSeries && !loading ? (
        <>
          <FilterForm
            initialFilters={initialFilters}
            countries={countries}
            filters={filters}
          />
          <DataTableTabs datasets={timeSeries} filters={filters} />
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            {/* FILTER FORM */}
            <Grid item sm="6">
              <Skeleton variant="rect" height={60} />
            </Grid>
            <Grid item sm="6">
              <Skeleton variant="rect" height={60} />
            </Grid>
            <Grid item sm="12">
              <Skeleton variant="rect" height={70} />
            </Grid>
            <Grid item sm="6">
              <Skeleton variant="rect" height={60} />
            </Grid>
            <Grid item sm="6">
              <Skeleton variant="rect" height={60} />
            </Grid>
            <Grid item sm="4">
              <Skeleton variant="rect" height={60} />
            </Grid>
            <Grid item sm="8"></Grid>

            {/* CHART */}
            <Grid item sm="12">
              <Skeleton variant="rect" height={50} />
            </Grid>
            <Grid item sm="2">
              <Skeleton variant="rect" height={50} />
            </Grid>
            <Grid item sm="10"></Grid>
            <Grid item sm="12">
              <Skeleton variant="rect" height={400} />
            </Grid>
          </Grid>
        </>
      )}
    </Layout>
  )
}

export default connect(
  state => {
    return {
      countries: getCountries(state),
      filters: getFilterFormValues(state),
      loading: state.timeSeries.loading,
      timeSeries: getFilteredTimeSeries(state),
    }
  },
  {
    fetchTimeSeries,
  },
)(ChartPage)
