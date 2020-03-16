import { takeLatest } from 'redux-saga/effects'
import types from './types'
import timeSeries from './time-series/sagas'

function* sagas() {
  yield takeLatest(types.TIME_SERIES_FETCH, timeSeries.fetchTimeSeriesSaga)
}

export default sagas
