import * as React from 'react'
import { Grid, Cell } from 'baseui/layout-grid'
import { DatePicker } from 'baseui/datepicker'
import { Label1 } from 'baseui/typography'
import { Chart, Rect } from './Chart'

import { chartHeight, barWidth, barMargin, QUESTIONS } from './constants'
import axios from 'axios'

const data = [
  { question: 1, choice: 5 },
  { question: 1, choice: 4 },
  { question: 1, choice: 4 },
  { question: 2, choice: 3 },
  { question: 2, choice: 1 },
]

function App() {
  const [startDate, setStartDate] = React.useState([null])
  const [endDate, setEndDate] = React.useState([null])

  const [reviews, setReviews] = React.useState([])

  const _getPoints = () => {
    if (window.innerWidth >= 1280) {
      return 10
    }
    if (window.innerWidth >= 768) {
      return 6
    }
    return 4
  }

  // from w3resource
  function diffMonths(end, start) {
    let diff = (end.getTime() - start.getTime()) / 1000
    diff /= 60 * 60 * 24 * 7 * 4
    return Math.abs(Math.round(diff))
  }
  const _handleDateSelection = () => {
    const monthsSelected = diffMonths(startDate[0], endDate[0])
    const numberOfBuckets = monthsSelected % _getPoints()

    const url = QUESTIONS(
      new Date(startDate).toLocaleDateString('fr-ca', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
      }),
      new Date(endDate).toLocaleDateString('fr-ca', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
      })
    )
    const config = {
      headers: { Authorization: 'Bearer SLSmxK17vjRInEWIiFQjwE1QIDfeSM' },
    }

    // new Date(x).getMonth()

    axios
      .get(url, config)
      .then((res) => {
        // reduce to [month: [{q: {total, count}}]]
        res.data.line_chart_data.reduce((acc, entry) => {
          // entry.submitted_at get-month-year
        }, {})

        // reduce [bucket: {q: {total, count}}]

        const reviews = data.reduce((acc, entry) => {
          if (entry.question in acc) {
            return {
              ...acc,
              [entry.question]: {
                total: acc[entry.question].total + entry.choice,
                count: acc[entry.question].count + 1,
              },
            }
          }

          return { ...acc, [entry.question]: { total: entry.choice, count: 1 } }
        }, {})

        setReviews(res.data.line_chart_data)
      })
      .catch((err) => alert('something went wrong'))
  }

  const renderBar = (review, i) => {
    const barHeight = Math.round(
      ((reviews[review].total / reviews[review].count) * 100) / 5
    )
    return (
      <Rect
        key={i}
        x={i * (barWidth + barMargin)}
        y={chartHeight - barHeight}
        height={barHeight}
        width={barWidth}
      />
    )
  }

  return (
    <>
      <Grid>
        <Cell span={[6, 4]}>
          <Label1>Start date</Label1>
          <DatePicker
            value={startDate}
            name="startDate"
            onChange={({ date }) =>
              setStartDate(Array.isArray(date) ? date : [date])
            }
          />
        </Cell>
        <Cell span={[6, 4]}>
          <Label1>End date</Label1>
          <DatePicker
            disabled={startDate[0] == null}
            value={endDate}
            name="startDate"
            onChange={({ date }) =>
              setEndDate(Array.isArray(date) ? date : [date])
            }
            onDayClick={_handleDateSelection}
          />
        </Cell>
      </Grid>

      <Grid>
        <Cell span={[12, 6]}>
          <Chart width="100" height="100">
            {Object.keys(reviews).map((review, i) => renderBar(review, i))}
          </Chart>
        </Cell>
      </Grid>
    </>
  )
}

export default App
