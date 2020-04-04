import { CHART_TYPES } from './chart/actions'

export const initialState = {
  chart: {
    type: CHART_TYPES.LINEAR,
  },
  timeSeries: {
    data: null,
    loading: false,
  },
}

export default initialState
