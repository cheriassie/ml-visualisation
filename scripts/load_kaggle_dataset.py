import kagglehub
from kagglehub import KaggleDatasetAdapter
import pandas as pd
import json
from pathlib import Path
import os

def find_dataset_file(dataset_path: str):
    """
    Find the main CSV file in the dataset.
    
    Args:
        dataset_path: Path to the downloaded dataset directory
    
    Returns:
        str: Path to the CSV file
    """
    dataset_dir = Path(dataset_path)
    
    csv_files = list(dataset_dir.glob("*.csv"))
    
    if csv_files:
        preferred_names = ['spotify', 'songs', 'data', 'dataset']
        for preferred in preferred_names:
            for csv_file in csv_files:
                if preferred.lower() in csv_file.name.lower():
                    return str(csv_file)
        return str(max(csv_files, key=lambda f: f.stat().st_size))
    
    raise FileNotFoundError("No CSV file found in the dataset")

def load_spotify_dataset():
    """
    Load the Spotify songs dataset from Kaggle.
    
    Returns:
        pandas.DataFrame: The loaded dataset
    """
    print("Loading Spotify Songs Dataset from Kaggle...")
    
    dataset_handle = "serkantysz/550k-spotify-songs-audio-lyrics-and-genres"

    dataset_path = kagglehub.dataset_download(dataset_handle)
    print(f"Dataset downloaded to: {dataset_path}")
    
    csv_file = find_dataset_file(dataset_path)
    
    df = pd.read_csv(csv_file)
    
    print(f"Shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")
    print(df.head())
    
    return df

def save_sample_data(df: pd.DataFrame, output_path: str = "../src/data/sample_spotify.json"):
    """
    Save a sample of the dataset as JSON for frontend use.
    This is useful for development/testing without loading the full dataset.
    
    Args:
        df: The dataframe to save
        output_path: Path where to save the sample JSON file
    """
    sample_df = df.head(1000)
    
    # Convert to JSON
    output_file = Path(output_path)
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    sample_df.to_json(output_file, orient='records', indent=2)
    print(f"\nSample data saved to {output_path}")

def process_and_save_data(df: pd.DataFrame, sample_size: int = 10000, output_dir: str = "../src/data"):
    """
    Process the dataset and save it in a format suitable for frontend use.
    
    Args:
        df: The dataframe to process
        sample_size: Number of rows to include (for performance)
        output_dir: Directory to save processed data
    """
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    sample_df = df.head(sample_size).copy()
    
    sample_df.columns = sample_df.columns.str.strip().str.lower().str.replace(' ', '_')
    
    full_output = output_path / "spotify_songs_sample.json"
    sample_df.to_json(full_output, orient='records', indent=2)
    print(f"\nFull sample ({sample_size} rows) saved to {full_output}")
    
    aggregated_data = {}
    
    if 'genre' in sample_df.columns:
        genre_counts = sample_df['genre'].value_counts().head(20).to_dict()
        aggregated_data['genre_distribution'] = {
            'labels': list(genre_counts.keys()),
            'values': list(genre_counts.values())
        }
    
    agg_output = output_path / "spotify_aggregated.json"
    with open(agg_output, 'w') as f:
        json.dump(aggregated_data, f, indent=2)
    print(f"Aggregated data saved to {agg_output}")
    
    info = {
        'total_rows': len(sample_df),
        'columns': list(sample_df.columns),
        'sample_size': sample_size,
        'full_dataset_size': len(df)
    }
    info_output = output_path / "spotify_info.json"
    with open(info_output, 'w') as f:
        json.dump(info, f, indent=2)
    print(f"Dataset info saved to {info_output}")
    
    return sample_df

if __name__ == "__main__":
    print("=" * 60)
    print("Spotify Songs Dataset Loader")
    print("=" * 60)
    
    try:
        df = load_spotify_dataset()
        
        print("\n" + "=" * 60)
        print("Processing and saving data...")
        print("=" * 60)
        process_and_save_data(df, sample_size=10000)
        
        
    except FileNotFoundError as e:
        print(f"\n File not found: {e}")
    except Exception as e:
        print(f"\n Error loading dataset: {e}")
