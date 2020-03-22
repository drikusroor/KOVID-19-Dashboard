import initialState from '../initial-state'
import types from '../types'

export const filtersReducer = function(state = initialState.filters, action) {
  switch (action.type) {
    case types.FILTERS_ADD_COUNTRY:
      return state.COUNTRY_FILTER.some(country => country === action.payload)
        ? state
        : {
            ...state,
            COUNTRY_FILTER: [...state.COUNTRY_FILTER, action.payload],
          }
    case types.FILTERS_REMOVE_COUNTRY:
      return {
        ...state,
        COUNTRY_FILTER: state.COUNTRY_FILTER.filter(
          country => country !== action.payload,
        ),
      }
    case types.FILTERS_SET_COUNTRY_FILTER:
      return {
        ...state,
        COUNTRY_FILTER: [...action.payload],
      }
    case types.FILTERS_SET_DEATH_RATE:
      return {
        ...state,
        DEATH_RATE: action.payload,
      }
    case types.FILTERS_SET_TIME_TO_DEATH:
      return {
        ...state,
        TIME_TO_DEATH: action.payload,
      }
    case types.FILTERS_TOGGLE_SHOW_PER_COUNTRY:
      return {
        ...state,
        SHOW_PER_COUNTRY: action.payload
          ? action.payload
          : state.SHOW_PER_COUNTRY
          ? !state.SHOW_PER_COUNTRY
          : false,
      }
    default:
      return state
  }
}

export default filtersReducer
