import { createSelector } from 'reselect'
import { calculateEstimations } from './helpers/calculate-estimations'
import { AGG_TYPES, AVG_TYPES } from '../chart/actions'

const getTimeSeries = (state) => state.timeSeries.data
const getChart = (state) => state.chart

export const getHeaders = createSelector([getTimeSeries], (timeSeries) => {
  return timeSeries && timeSeries[0] ? timeSeries[0].headers : null
})

export const getDates = createSelector([getHeaders], (headers) => {
  return headers && headers.length > 4 ? headers.slice(4, headers.length) : []
})

export const getInitialDates = createSelector([getDates], (dates) => {
  return [0, dates && dates.length > 0 ? dates.length - 1 : 1]
})

export const getCountries = (state) => {
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

export const getForms = (state) => state.form || {}

export const modifyTimeSerieRows = (datasets, modificationFn, params) => {
  return datasets.map((dataset) => {
    const { headers, data: rows } = dataset
    return { headers, data: [...modificationFn(rows, params)] }
  })
}

export const getTimeSeriesPerCountry = (rows) => {
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
    .map((key) => rowsPerCountry[key])
}

export const getTimeSeriesTotalPerPredicate = (rows, { predicate, key }) => {
  const rowsPerCountry = rows
    .filter((row) => predicate(row))
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
              return parseInt(col || 0)
            }
          }),
        }
      } else {
        const newRow = exists.map((_col, index) => {
          if (index < 4) {
            return exists[index]
          } else {
            return parseInt(exists[index]) + parseInt(curr[index] || 0)
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
    .map((key) => rowsPerCountry[key])
}

export const getCountryFilteredTimeSeries = (rows, countryFilter = []) => {
  return rows.filter((row) =>
    countryFilter.some((country) => country === row[1]),
  )
}

const getAverage = (values, index, amount) => {
  const lastElements = values.slice(index - amount + 1, index + 1)
  return (
    lastElements.reduce(
      (acc, curr) => (typeof curr === 'number' || index < 5 ? acc + curr : acc),
      0,
    ) / amount
  )
}

export const getAverages = (rows, amount = 7) => {
  return rows.map((row) => {
    return row.reduce((acc, curr, index, array) => {
      if (index < 5) {
        return [...acc, curr]
      } else {
        const average = getAverage(array, index, amount)
        return [...acc, average]
      }
    }, [])
  })
}

export const getGrowthNumbers = (rows) => {
  return rows.map((row) => {
    return row.reduce((acc, curr, index, array) => {
      if (index < 4) {
        return [...acc, curr]
      } else if (index === 4) {
        return [...acc, 0]
      } else {
        return [...acc, curr - array[index - 1]]
      }
    }, [])
  })
}

export const getGrowthPercentage = (rows) => {
  return rows.map((row) => {
    return row.reduce((acc, curr, index, array) => {
      if (index < 4) {
        return [...acc, curr]
      } else if (index === 4) {
        return [...acc, null]
      } else {
        return [
          ...acc,
          curr && array[index - 1] ? (100 * curr) / array[index - 1] : null,
        ]
      }
    }, [])
  })
}

export const getFilteredTimeSeries = createSelector(
  [getTimeSeries, getForms, getChart],
  (datasets, forms, chart) => {
    if (!datasets) return null

    const { FilterForm } = forms
    const { values } = FilterForm || {}
    const {
      averageDaysAmount,
      countryFilter,
      dates,
      showEstimates,
      showPerCountry,
    } = values || {}
    const { aggType, avgType } = chart

    if (dates) {
      const [begin, end] = dates
      datasets = datasets.map((dataset) => {
        let { headers, data } = dataset
        headers = headers.slice(0, 4).concat(headers.slice(begin + 4, end + 5))
        data = data.map((row) => {
          return row.slice(0, 4).concat(row.slice(begin + 4, end + 5))
        })
        return {
          headers,
          data,
        }
      })
    }

    const total = modifyTimeSerieRows(
      datasets,
      getTimeSeriesTotalPerPredicate,
      {
        predicate: (_row) => true,
        key: 'Total',
      },
    )

    if (showPerCountry)
      datasets = modifyTimeSerieRows(datasets, getTimeSeriesPerCountry)

    if (countryFilter && countryFilter.length > 0) {
      datasets = modifyTimeSerieRows(
        datasets,
        getCountryFilteredTimeSeries,
        countryFilter,
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
      datasets = datasets.map((dataset, index) => {
        const { headers } = dataset
        return {
          headers,
          data: [...total[index].data],
        }
      })
    }

    if (aggType === AGG_TYPES.GROWTH_NUMBER) {
      datasets = modifyTimeSerieRows(datasets, getGrowthNumbers)
    } else if (aggType === AGG_TYPES.GROWTH_PERCENTAGE) {
      datasets = modifyTimeSerieRows(datasets, getGrowthPercentage)
    }

    if (avgType === AVG_TYPES.AVERAGES) {
      datasets = modifyTimeSerieRows(
        datasets,
        getAverages,
        averageDaysAmount || 7,
      )
    }

    if (showEstimates) {
      datasets = calculateEstimations(datasets, forms.FilterForm.values)
    }

    return datasets
  },
)
