import kagglehub
from kagglehub import KaggleDatasetAdapter
import pandas as pd
import json
from pathlib import Path

def load_spotify_dataset(file_path: str = ""):
    """
    Load the Spotify songs dataset from Kaggle.
    
    Args:
        file_path: Path to the specific file within the dataset to load.
                   If empty, loads the default/main file.
    
    Returns:
        pandas.DataFrame: The loaded dataset
    """
    print("Loading Spotify Songs Dataset from Kaggle...")
    
    # Load the latest version
    df = kagglehub.load_dataset(
        KaggleDatasetAdapter.PANDAS,
        "serkantysz/550k-spotify-songs-audio-lyrics-and-genres",
        file_path,
    )
    
    print(f"Dataset loaded successfully!")
    print(f"Shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")
    print("\nFirst 5 records:")
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
    # Take a sample (e.g., first 1000 rows) for development
    sample_df = df.head(1000)
    
    # Convert to JSON
    output_file = Path(output_path)
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    sample_df.to_json(output_file, orient='records', indent=2)
    print(f"\nSample data saved to {output_path}")

if __name__ == "__main__":
    # Example usage
    # df = load_spotify_dataset()
    # save_sample_data(df)
    print("Kaggle dataset loader script ready.")
    print("Uncomment the code above to load the dataset.")
