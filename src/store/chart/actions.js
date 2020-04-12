import { createAction } from 'redux-actions'
import types from '../types'

export const AGG_TYPES = {
  ACCUMULATIVE: 'ACCUMULATIVE',
  GROWTH_NUMBER: 'GROWTH_NUMBER',
  GROWTH_PERCENTAGE: 'GROWTH_PERCENTAGE',
}

export const CHART_TYPES = {
  BAR: 'BAR',
  LINE: 'LINE',
}

export const SCALE_TYPES = {
  LINEAR: 'LINEAR',
  LOGARITHMIC: 'LOGARITHMIC',
}

export const setAggType = createAction(
  types.CHART_SET_AGG_TYPE,
  (payload) => payload,
)

export const setChartType = createAction(
  types.CHART_SET_CHART_TYPE,
  (payload) => payload,
)

export const setScaleType = createAction(
  types.CHART_SET_SCALE_TYPE,
  (payload) => payload,
)
