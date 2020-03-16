import { createAction } from 'redux-actions'
import types from '../types'

export const fetchTimeSeries = createAction(types.TIME_SERIES_FETCH)
