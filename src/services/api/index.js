import http from '../http'

const fetchConfirmed = async () =>
  http(
    '/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv',
  )

const fetchDeaths = async () =>
  http(
    '/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv',
  )

const fetchRecovered = async () =>
  http(
    '/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv',
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
