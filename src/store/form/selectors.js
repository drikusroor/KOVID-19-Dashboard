export const getFilterFormValues = state =>
  (state &&
    state.form &&
    state.form.FilterForm &&
    state.form.FilterForm.values) ||
  {}
