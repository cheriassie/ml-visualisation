'use client'

import { useEffect, useState } from 'react'
import { fetchSpotifyData, fetchSpotifyInfo, fetchAggregatedData } from '@/utils/api'
import type { SpotifySong, DatasetInfo, AggregatedData } from '@/utils/api'
import { theme } from '@/utils/theme'
import GenreChart from './charts/GenreChart'
import AudioFeaturesChart from './charts/AudioFeaturesChart'

interface DataVisualizationProps {
  dataset: string
}

export default function DataVisualization({ dataset }: DataVisualizationProps) {
  const [data, setData] = useState<SpotifySong[]>([])
  const [info, setInfo] = useState<DatasetInfo | null>(null)
  const [aggregated, setAggregated] = useState<AggregatedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (dataset === 'spotify-songs') {
      loadData()
    }
  }, [dataset])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [sampleData, datasetInfo, aggData] = await Promise.all([
        fetchSpotifyData(1000),
        fetchSpotifyInfo().catch(() => null),
        fetchAggregatedData().catch(() => null),
      ])
      
      setData(sampleData)
      setInfo(datasetInfo)
      setAggregated(aggData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={theme.styles.card}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className={`${theme.styles.spinner} h-12 w-12 mx-auto mb-4`}></div>
            <p className="text-slate-400">Loading dataset...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={theme.styles.card}>
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <h3 className="text-red-400 font-semibold mb-2">Error Loading Data</h3>
          <p className="text-red-300 text-sm mb-4">{error}</p>
          <p className="text-slate-400 text-xs">
            Make sure you've run: <code className="px-2 py-1 rounded" style={{ backgroundColor: theme.colors.background.code }}>python scripts/load_kaggle_dataset.py</code>
          </p>
        </div>
      </div>
    )
  }

  if (dataset === 'spotify-songs') {
    return (
      <div className="space-y-6">
        {info && (
          <div className={theme.styles.card}>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Spotify Songs Dataset
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Loaded:</span>
                <span className="text-white font-semibold ml-2">{data.length.toLocaleString()}</span>
              </div>
              {info && (
                <>
                  <div>
                    <span className="text-slate-400">Sample Size:</span>
                    <span className="text-white font-semibold ml-2">{info.sample_size.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Full Dataset:</span>
                    <span className="text-white font-semibold ml-2">{info.full_dataset_size.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Columns:</span>
                    <span className="text-white font-semibold ml-2">{info.columns.length}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {aggregated?.genre_distribution && (
            <GenreChart data={aggregated.genre_distribution} />
          )}
          {data.length > 0 && (
            <AudioFeaturesChart data={data} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={theme.styles.card}>
      <h2 className="text-2xl font-semibold text-white mb-4">
        Visualization: {dataset}
      </h2>
      <div className={theme.styles.cardInner}>
        <p className="text-slate-400">No visualization available for this dataset</p>
      </div>
    </div>
  )
}
