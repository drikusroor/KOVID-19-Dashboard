import { call, put } from 'redux-saga/effects'
import api from '../../services/api'
import types from '../types'

function* fetchTimeSeriesSaga(action) {
  try {
    let datasets = yield call(api.fetchTimeSeries)
    datasets = datasets.map(dataset => {
      return {
        headers: dataset[0],
        data: dataset.slice(1, dataset.length),
      }
    })
    yield put({
      type: types.FILTERS_SET_DATE_RANGE,
      payload: [0, datasets[0].headers.length - 1],
    })
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
