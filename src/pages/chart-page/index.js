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
      ) : null}
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
