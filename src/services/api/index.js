import http from '../http'

const fetchConfirmed = async () =>
  http(
    '/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
  )

const fetchDeaths = async () =>
  http(
    '/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv',
  )

const fetchRecovered = async () =>
  http(
    '/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv',
  )

export async function fetchTimeSeries() {
  return Promise.all([fetchConfirmed(), fetchDeaths(), fetchRecovered()])
}

export default {
  fetchConfirmed,
  fetchDeaths,
  fetchRecovered,
  fetchTimeSeries,
}
