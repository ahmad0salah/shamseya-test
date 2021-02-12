const _base = 'https://staging.mymelior.com/v1'

export const QUESTIONS = (startDate, endDate) =>
  `${_base}/branches/1/progress?date_from=${startDate}&date_to=${endDate}`

export const ANSWERS = `${_base}/questions`

export const chartHeight = 100
export const barWidth = 10
export const barMargin = 10
