export const initialState = {
  filters: {
    COUNTRY_FILTER: [],
    DEATH_RATE: 0.014,
    TIME_TO_DEATH: 14,
    SHOW_PER_COUNTRY: true,
  },
  timeSeries: {
    data: null,
    loading: false,
  },
}

export default initialState
