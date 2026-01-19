// Type definitions for datasets and visualizations

export interface SpotifySong {
  track_id?: string
  track_name?: string
  track_artist?: string
  track_album_name?: string
  track_popularity?: number
  genre?: string
  danceability?: number
  energy?: number
  key?: number
  loudness?: number
  mode?: number
  speechiness?: number
  acousticness?: number
  instrumentalness?: number
  liveness?: number
  valence?: number
  tempo?: number
  duration_ms?: number
  time_signature?: number
  // Add more fields as needed based on the actual dataset
}

export interface VisualizationConfig {
  type: 'bar' | 'line' | 'scatter' | 'pie' | 'heatmap'
  xAxis?: string
  yAxis?: string
  colorBy?: string
  title: string
}
