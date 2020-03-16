import initialState from '../initial-state'
import types from '../types'

export const timeSeriesReducer = function(
  state = initialState.timeSeries,
  action,
) {
  switch (action.type) {
    case types.TIME_SERIES_FETCH:
      return {
        ...state,
        loading: true,
      }
    case types.TIME_SERIES_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case types.TIME_SERIES_RESET_REDUCER:
      return initialState.timeSeries
    default:
      return state
  }
}

export default timeSeriesReducer
