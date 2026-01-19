'use client'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import type { SpotifySong } from '@/utils/api'
import { theme } from '@/utils/theme'

interface AudioFeaturesChartProps {
  data: SpotifySong[]
}

export default function AudioFeaturesChart({ data }: AudioFeaturesChartProps) {
  const chartData = data
    .filter(song => 
      song.energy !== undefined && 
      song.danceability !== undefined &&
      song.popularity !== undefined
    )
    .slice(0, 500)
    .map(song => ({
      energy: Number(song.energy) * 100,
      danceability: Number(song.danceability) * 100,
      popularity: Number(song.popularity) || 0,
    }))

  const getColor = (popularity: number) => {
    if (popularity > 70) return theme.colors.popularity.high
    if (popularity > 40) return theme.colors.popularity.medium
    return theme.colors.popularity.low
  }

  return (
    <div className={theme.styles.card}>
      <h3 className="text-xl font-semibold text-white mb-4">
        Energy vs Danceability
      </h3>
      <p className="text-sm text-slate-400 mb-4">
        Showing {chartData.length} songs (colored by popularity)
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.chart.grid} />
          <XAxis 
            type="number"
            dataKey="energy"
            name="Energy"
            label={{ value: 'Energy (%)', position: 'insideBottom', offset: -5, fill: theme.colors.chart.axis }}
            stroke={theme.colors.chart.axis}
            domain={[0, 100]}
          />
          <YAxis 
            type="number"
            dataKey="danceability"
            name="Danceability"
            label={{ value: 'Danceability (%)', angle: -90, position: 'insideLeft', fill: theme.colors.chart.axis }}
            stroke={theme.colors.chart.axis}
            domain={[0, 100]}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ 
              backgroundColor: theme.colors.chart.tooltip.bg, 
              border: `1px solid ${theme.colors.chart.tooltip.border}`,
              borderRadius: '8px',
              color: theme.colors.chart.tooltip.text
            }}
            formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
          />
          <Legend />
          <Scatter name="Songs" dataKey="danceability" fill={theme.colors.primary.default}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.popularity)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-4 flex gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>High Popularity (&gt;70)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Medium Popularity (40-70)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span>Low Popularity (&lt;40)</span>
        </div>
      </div>
    </div>
  )
}
