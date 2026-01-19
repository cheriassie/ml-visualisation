export interface SpotifySong {
  [key: string]: any
}

export interface DatasetInfo {
  total_rows: number
  columns: string[]
  sample_size: number
  full_dataset_size: number
}

export interface AggregatedData {
  genre_distribution?: {
    labels: string[]
    values: number[]
  }
}

export async function fetchSpotifyData(limit?: number): Promise<SpotifySong[]> {
  const params = new URLSearchParams()
  if (limit) {
    params.append('limit', limit.toString())
  }
  
  const response = await fetch(`/api/datasets/spotify?${params.toString()}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`)
  }
  
  const result = await response.json()
  return result.data || result
}

export async function fetchSpotifyInfo(): Promise<DatasetInfo> {
  const response = await fetch('/api/datasets/spotify?type=info')
  if (!response.ok) {
    throw new Error(`Failed to fetch info: ${response.statusText}`)
  }
  return response.json()
}

export async function fetchAggregatedData(): Promise<AggregatedData> {
  const response = await fetch('/api/datasets/spotify?type=aggregated')
  if (!response.ok) {
    throw new Error(`Failed to fetch aggregated data: ${response.statusText}`)
  }
  return response.json()
}
