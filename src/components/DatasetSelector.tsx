'use client'

import { useEffect, useState } from 'react'
import { theme } from '@/utils/theme'

type DatasetStatus = 'available' | 'coming-soon'

interface Dataset {
  id: string
  name: string
  description: string
  status: DatasetStatus
}

interface DatasetSelectorProps {
  selectedDataset: string | null
  onDatasetSelect: (dataset: string | null) => void
}

export default function DatasetSelector({ 
  selectedDataset, 
  onDatasetSelect 
}: DatasetSelectorProps) {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/datasets')
      .then(res => res.json())
      .then(data => {
        if (data.datasets) {
          setDatasets(data.datasets)
        }
      })
      .catch(err => console.error('Failed to fetch datasets:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={theme.styles.card}>
      <h2 className="text-2xl font-semibold text-white mb-4">
        Available Datasets
      </h2>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className={`${theme.styles.spinner} h-8 w-8`}></div>
          <span className="ml-3 text-slate-400">Loading datasets...</span>
        </div>
      ) : datasets.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          No datasets available
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {datasets.map((dataset) => (
            <button
            key={dataset.id}
            onClick={() => {
              if (dataset.status === 'available') {
                onDatasetSelect(dataset.id)
              }
            }}
            disabled={dataset.status !== 'available'}
            className={`
              p-4 rounded-lg border transition-all text-left
              ${
                selectedDataset === dataset.id
                  ? `border-purple-500 bg-purple-900/20`
                  : dataset.status === 'available'
                  ? 'border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700'
                  : 'border-slate-700 bg-slate-800/30 opacity-60 cursor-not-allowed'
              }
            `}
          >
            <h3 className="font-semibold text-white mb-1">{dataset.name}</h3>
            <p className="text-sm text-slate-400 mb-2">{dataset.description}</p>
            {dataset.status === 'coming-soon' && (
              <span className="text-xs" style={{ color: theme.colors.status.comingSoon }}>Loading...</span>
            )}
            {dataset.status === 'available' && (
              <span className="text-xs" style={{ color: theme.colors.status.available }}>Available</span>
            )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
