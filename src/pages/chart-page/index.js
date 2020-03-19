import { Layout } from '../../components/layout'
import React, { useEffect } from 'react'
import DataTableTabs from '../../components/data-table-tabs'
import { connect } from 'react-redux'
import { setCountryFilter } from '../../store/filters/actions'
import { fetchTimeSeries } from '../../store/time-series/actions'
import {
  getFilteredTimeSeries,
  getCountries,
} from '../../store/time-series/selectors'
import FilterForm from '../../components/filter-form'
import { useParams } from 'react-router-dom'

const ChartPage = ({
  countries,
  initialFilters,
  filters,
  fetchTimeSeries,
  setCountryFilter,
  timeSeries,
}) => {
  const { country, type } = useParams()
  useEffect(() => {
    if (country) {
      setCountryFilter([country])
    }
    fetchTimeSeries(type)
  }, [])

  return (
    <Layout title="COVID-19 histogram per country">
      <FilterForm
        initialFilters={initialFilters}
        countries={countries}
        filters={filters}
      />
      <DataTableTabs datasets={timeSeries} filters={filters} />
    </Layout>
  )
}

export default connect(
  state => {
    return {
      countries: getCountries(state),
      filters: state.filters,
      timeSeries: getFilteredTimeSeries(state),
    }
  },
  {
    fetchTimeSeries,
    setCountryFilter,
  },
)(ChartPage)
