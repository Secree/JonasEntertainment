import { useState, useEffect, useRef } from 'react';
import './Music.css';

const JAMENDO_CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;

function Music() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  const loadPopularTracks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=30&order=popularity_total`
      );
      const data = await response.json();
      setTracks(data.results);
    } catch (error) {
      console.error('Error loading tracks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchTracks = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadPopularTracks();
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=30&search=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setTracks(data.results);
    } catch (error) {
      console.error('Error searching tracks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPopularTracks();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audio;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="music-page">
        <h1>Music Player</h1>
        <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.5rem' }}>
          Loading music... 🎵
        </div>
      </div>
    );
  }

  return (
    <div className="music-page">
      <h1>Music Player</h1>

      <form onSubmit={searchTracks} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for music..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {currentTrack && (
        <div className="player-card">
          <div className="now-playing">
            {currentTrack.image && (
              <img
                src={currentTrack.image}
                alt={currentTrack.name}
                className="album-art"
              />
            )}
            <div className="track-info">
              <h2>{currentTrack.name}</h2>
              <p>{currentTrack.artist_name}</p>
            </div>
          </div>

          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="controls">
            <button onClick={togglePlayPause} className="play-button">
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
          </div>

          <div className="progress-bar">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="seek-bar"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>

          <div className="volume-control">
            <span>🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span>{Math.round(volume)}%</span>
          </div>
        </div>
      )}

      <h2 className="playlist-title">
        {searchQuery ? `Search Results: "${searchQuery}"` : 'Popular Tracks'}
      </h2>

      <div className="track-list">
        {tracks.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem' }}>
            No tracks found. Try a different search term.
          </p>
        ) : (
          tracks.map((track, index) => (
            <div
              key={track.id}
              className={`track-item ${currentTrack?.id === track.id ? 'active' : ''}`}
              onClick={() => playTrack(track)}
            >
              <div className="track-number">{index + 1}</div>
              {track.image && (
                <img
                  src={track.image}
                  alt={track.name}
                  className="track-thumbnail"
                />
              )}
              <div className="track-details">
                <div className="track-name">{track.name}</div>
                <div className="track-artist">{track.artist_name}</div>
              </div>
              {currentTrack?.id === track.id && isPlaying && (
                <span className="playing-indicator">♫</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Music;
