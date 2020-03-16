import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import api from '../../services/api'
import types from '../types'

function* fetchTimeSeriesSaga(action) {
  try {
    const datasets = yield call(api.fetchTimeSeries)
    yield put({
      type: types.TIME_SERIES_FETCH_SUCCESS,
      payload: datasets,
    })
  } catch (e) {
    yield put({ type: 'TIME_SERIES_FETCH_ERROR', message: e.message })
  }
}

export default {
  fetchTimeSeriesSaga,
}
