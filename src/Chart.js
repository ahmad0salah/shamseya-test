import React from 'react'
import { useStyletron } from 'baseui'

// tutorial I followed https://youtu.be/N97qkU6t9Sk

export function Chart({ children, width, height }) {
  const [css] = useStyletron()

  return (
    <svg
      className={css({
        background: '#eee',
        marginTop: '2rem',
      })}
      viewBox={`0 0 ${width} ${height}`}
    >
      {children}
    </svg>
  )
}

export function Rect({ x, y, width, height }) {
  const [css] = useStyletron()

  return (
    <>
      <rect
        className={css({
          fill: '#333',
        })}
        x={x}
        y={y}
        width={width}
        height={height}
      />
      <text
        className={css({
          fill: 'red',
          fontSize: '4px',
        })}
        x={x + width / 4}
        y={y - 2}
      >
        {height}%
      </text>
    </>
  )
}
