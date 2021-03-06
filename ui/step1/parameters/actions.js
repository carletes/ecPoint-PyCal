export const setOutPath = path => ({
  type: 'PARAMETERS.SET_OUT_PATH',
  data: path,
})

export const setDateStartField = moment => ({
  type: 'PARAMETERS.SET_DATE_START_FIELD',
  value: moment.format('YYYYMMDD'),
})

export const setDateEndField = moment => ({
  type: 'PARAMETERS.SET_DATE_END_FIELD',
  value: moment.format('YYYYMMDD'),
})

export const setLimSUField = value => ({
  type: 'PARAMETERS.SET_LIMSU_FIELD',
  value,
})

export const setRangeField = value => ({
  type: 'PARAMETERS.SET_RANGE_FIELD',
  value,
})

export const updatePageCompletion = (page, isComplete) => ({
  type: 'PAGE.UPDATE_PAGE_COMPLETION',
  page,
  section: 'parameters',
  isComplete,
})
