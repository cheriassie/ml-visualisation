import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'sample'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : null
    
    const dataDir = path.join(process.cwd(), 'src', 'data')
    
    if (type === 'aggregated') {
      const filePath = path.join(dataDir, 'spotify_aggregated.json')
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { error: 'Aggregated data not found. Please run the Python script first.' },
          { status: 404 }
        )
      }
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      return NextResponse.json(data)
    }
    
    if (type === 'info') {
      const filePath = path.join(dataDir, 'spotify_info.json')
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { error: 'Dataset info not found. Please run the Python script first.' },
          { status: 404 }
        )
      }
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      return NextResponse.json(data)
    }
    
    const filePath = path.join(dataDir, 'spotify_songs_sample.json')
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Dataset not found. Please run: python scripts/load_kaggle_dataset.py' },
        { status: 404 }
      )
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const result = limit ? data.slice(0, limit) : data
    
    return NextResponse.json({
      data: result,
      total: data.length,
      returned: result.length,
    })
    
  } catch (error) {
    console.error('Error loading dataset:', error)
    return NextResponse.json(
      { error: 'Failed to load dataset', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
