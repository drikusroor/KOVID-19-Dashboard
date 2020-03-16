import { createSelector } from 'reselect'

const getTimeSeries = state => state.timeSeries.data

export const getCountries = state => {
  const dataset = state.timeSeries.data && state.timeSeries.data[0]
  if (!dataset || !dataset.data || dataset.data.length < 1) return []
  const { data } = dataset
  return Object.keys(
    state.timeSeries.data
      ? data.reduce((acc, curr) => {
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
    const { headers, data: rows } = dataset
    return { headers, data: [...modificationFn(rows, params)] }
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
            return ''
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

export const getTimeSeriesTotalPerPredicate = (rows, { predicate, key }) => {
  const rowsPerCountry = rows
    .filter(row => predicate(row))
    .reduce((acc, curr) => {
      const exists = acc[key]

      if (!exists) {
        return {
          ...acc,
          [key]: curr.map((col, index) => {
            if (index === 0) {
              return ''
            } else if (index === 1) {
              return key
            } else if (index < 4) {
              return ''
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
          [key]: newRow,
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

    const total = modifyTimeSerieRows(
      datasets,
      getTimeSeriesTotalPerPredicate,
      {
        predicate: _row => true,
        key: 'Total',
      },
    )

    if (filters.SHOW_PER_COUNTRY)
      datasets = modifyTimeSerieRows(datasets, getTimeSeriesPerCountry)

    if (filters.COUNTRY_FILTER && filters.COUNTRY_FILTER.length > 0) {
      datasets = modifyTimeSerieRows(
        datasets,
        getCountryFilteredTimeSeries,
        filters.COUNTRY_FILTER,
      )

      datasets = datasets.map((dataset, index) => {
        const { headers, data } = dataset
        return {
          headers,
          data: [...data],
          total: [...total[index].data],
        }
      })
    } else {
      const china = modifyTimeSerieRows(
        datasets,
        getTimeSeriesTotalPerPredicate,
        {
          predicate: row => row[1] === 'China',
          key: 'China',
        },
      )
      const notChina = modifyTimeSerieRows(
        datasets,
        getTimeSeriesTotalPerPredicate,
        {
          predicate: row => row[1] !== 'China',
          key: 'Not China',
        },
      )

      datasets = datasets.map((dataset, index) => {
        const { headers } = dataset
        return {
          headers,
          data: [
            ...china[index].data,
            ...notChina[index].data,
            ...total[index].data,
          ],
        }
      })
    }

    return datasets
  },
)
