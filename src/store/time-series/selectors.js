import { createSelector } from 'reselect'

const getTimeSeries = state => state.timeSeries.data

export const getCountries = state => {
  const dataset = state.timeSeries.data && state.timeSeries.data[0]
  return Object.keys(
    state.timeSeries.data
      ? dataset.slice(1, dataset.length).reduce((acc, curr) => {
          return {
            ...acc,
            [curr[1]]: curr[1],
          }
        }, {})
      : {},
  ).sort()
}

export const getFilters = state => state.filters || {}

export const modifyTimeSerieRows = (datasets, modificationFn, params) => {
  return datasets.map(dataset => {
    const headers = dataset[0]
    const rows = dataset.slice(1, dataset.length)
    return [headers, ...modificationFn(rows, params)]
  })
}

export const getTimeSeriesPerCountry = rows => {
  const rowsPerCountry = rows.reduce((acc, curr) => {
    const exists = acc[curr[1]]

    if (!exists) {
      return {
        ...acc,
        [curr[1]]: curr.map((col, index) => {
          if (index === 0) {
            return col
          } else if (index < 4) {
            return col
          } else {
            return parseInt(col)
          }
        }),
      }
    } else {
      const newRow = exists.map((_col, index) => {
        if (index < 4) {
          return exists[index]
        } else {
          return parseInt(exists[index]) + parseInt(curr[index])
        }
      })

      return {
        ...acc,
        [curr[1]]: newRow,
      }
    }
  }, {})

  return Object.keys(rowsPerCountry)
    .sort()
    .map(key => rowsPerCountry[key])
}

export const getCountryFilteredTimeSeries = (rows, countryFilter) => {
  return rows.filter(row => countryFilter.some(country => country === row[1]))
}

export const getFilteredTimeSeries = createSelector(
  [getTimeSeries, getFilters],
  (datasets, filters) => {
    if (!datasets) return null

    if (filters.SHOW_PER_COUNTRY)
      datasets = modifyTimeSerieRows(datasets, getTimeSeriesPerCountry)

    if (filters.COUNTRY_FILTER && filters.COUNTRY_FILTER.length > 0) {
      datasets = modifyTimeSerieRows(
        datasets,
        getCountryFilteredTimeSeries,
        filters.COUNTRY_FILTER,
      )
    }

    return datasets
  },
)
