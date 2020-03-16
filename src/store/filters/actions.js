import { createAction } from 'redux-actions'
import types from '../types'

export const addCountry = createAction(
  types.FILTERS_ADD_COUNTRY,
  payload => payload,
)
export const removeCountry = createAction(
  types.FILTERS_REMOVE_COUNTRY,
  payload => payload,
)

export const setCountryFilter = createAction(types.FILTERS_SET_COUNTRY_FILTER)
