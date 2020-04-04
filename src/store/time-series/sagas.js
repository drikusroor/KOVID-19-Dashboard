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
      type: types.TIME_SERIES_FETCH_SUCCESS,
      payload: datasets,
    })
  } catch (e) {
    console.log({ e })
    yield put({ type: types.TIME_SERIES_FETCH_ERROR, payload: e.message })
  }
}

export default {
  fetchTimeSeriesSaga,
}
