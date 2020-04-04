import initialState from '../initial-state'
import types from '../types'

export const chartReducer = function (state = initialState.chart, action) {
  switch (action.type) {
    case types.CHART_SET_TYPE:
      return {
        ...state,
        type: action.payload,
      }
    case types.CHART_RESET_REDUCER:
      return initialState.chart
    default:
      return state
  }
}

export default chartReducer
