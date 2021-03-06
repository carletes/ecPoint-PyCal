export const setScratchValue = value => async dispatch => {
  await dispatch({
    type: 'APP.SET_SCRATCH_VALUE',
    data: value,
  })

  if (value === false) {
    await dispatch({
      type: 'PAGE.SET_PAGE',
      page: 3,
    })
  }
}
