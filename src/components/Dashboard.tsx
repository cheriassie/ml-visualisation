'use client'

import { useState } from 'react'
import { theme } from '@/utils/theme'
import DataVisualization from './DataVisualization'
import DatasetSelector from './DatasetSelector'

export default function Dashboard() {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <DatasetSelector 
        selectedDataset={selectedDataset}
        onDatasetSelect={setSelectedDataset}
      />
      {selectedDataset && (
        <DataVisualization dataset={selectedDataset} />
      )}
      {!selectedDataset && (
        <div className={`${theme.styles.card} p-12 text-center`}>
          <p className="text-slate-400 text-lg">
            Select a dataset to begin visualization
          </p>
        </div>
      )}
    </div>
  )
}
