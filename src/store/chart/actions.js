import { createAction } from 'redux-actions'
import types from '../types'

export const CHART_TYPES = {
  GROWTH_NUMBER: 'GROWTH_NUMBER',
  LINEAR: 'LINEAR',
  LOGARITHMIC: 'LOGARITHMIC',
}

export const setGrowthNumber = createAction(
  types.CHART_SET_TYPE,
  () => CHART_TYPES.GROWTH_NUMBER,
)

export const setLinear = createAction(
  types.CHART_SET_TYPE,
  () => CHART_TYPES.LINEAR,
)

export const setLogarithmic = createAction(
  types.CHART_SET_TYPE,
  () => CHART_TYPES.LOGARITHMIC,
)
