'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { theme } from '@/utils/theme'

interface GenreChartProps {
  data: {
    labels: string[]
    values: number[]
  }
}

export default function GenreChart({ data }: GenreChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const chartData = data.labels.map((label, index) => ({
    genre: label.length > 15 ? label.substring(0, 15) + '...' : label,
    count: data.values[index],
  }))

  return (
    <div className={theme.styles.card}>
      <h3 className="text-xl font-semibold text-white mb-4">Genre Distribution</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={chartData}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex !== undefined) {
              setHoveredIndex(state.activeTooltipIndex)
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.chart.grid} />
          <XAxis 
            dataKey="genre" 
            stroke={theme.colors.chart.axis}
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis stroke={theme.colors.chart.axis} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme.colors.chart.tooltip.bg, 
              border: `1px solid ${theme.colors.chart.tooltip.border}`,
              borderRadius: '8px',
              color: theme.colors.chart.tooltip.text
            }}
            itemStyle={{ color: theme.colors.chart.tooltip.text }}
            labelStyle={{ color: theme.colors.chart.tooltip.text }}
            cursor={{ fill: 'transparent' }}
          />
          <Legend />
          <Bar 
            dataKey="count" 
            name="Songs"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={hoveredIndex === index ? theme.colors.primary.hover : theme.colors.primary.default}
                style={{ transition: 'fill 0.2s' }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
