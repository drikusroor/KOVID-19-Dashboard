import initialState from '../initial-state'
import types from '../types'

export const chartReducer = function (state = initialState.chart, action) {
  switch (action.type) {
    case types.CHART_SET_AGG_TYPE:
      return {
        ...state,
        aggType: action.payload,
      }
    case types.CHART_SET_CHART_TYPE:
      return {
        ...state,
        chartType: action.payload,
      }
    case types.CHART_SET_SCALE_TYPE:
      return {
        ...state,
        scaleType: action.payload,
      }
    case types.CHART_RESET_REDUCER:
      return initialState.chart
    default:
      return state
  }
}

export default chartReducer
