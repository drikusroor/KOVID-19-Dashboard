import { AGG_TYPES, CHART_TYPES, SCALE_TYPES } from './chart/actions'

export const initialState = {
  chart: {
    aggType: AGG_TYPES.ACCUMULATIVE,
    chartType: CHART_TYPES.BAR,
    scaleType: SCALE_TYPES.LINEAR,
  },
  timeSeries: {
    data: null,
    loading: false,
  },
}

export default initialState
