import { NextResponse } from 'next/server'


export async function GET() {
  const fs = require('fs')
  const path = require('path')
  const dataDir = path.join(process.cwd(), 'src', 'data')
  const dataFile = path.join(dataDir, 'spotify_songs_sample.json')
  
  const spotifyStatus = fs.existsSync(dataFile) ? 'available' : 'coming-soon'
  
  return NextResponse.json({
    datasets: [
      {
        id: 'spotify-songs',
        name: 'Spotify Songs Dataset',
        description: '550k Spotify songs with audio features, lyrics, and genres',
        status: spotifyStatus,
      },
    ],
  })
}
