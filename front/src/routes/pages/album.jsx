import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Album = ({ albumId }) => {
    const [album, setAlbum] = useState(null);
    const [error, setError] = useState(null);

    const { id } = useParams();


    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/albums/${id}/`);
                setAlbum(response.data);
            } catch (err) {
                setError('Failed to fetch album details');
            }
        };

        fetchAlbum();
    }, [albumId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!album) {
        return <div>Loading...</div>;
    }

    return (
        <div id='album-page' className="w-100" style={{ height: '100vh', backgroundColor: '#1a1a1a', color: '#ffffff' }}>
            <div className="album-container container text-white">
                <div className="row">
                    <div className="col-md-6 text-center pt-5">
                        {album.images && album.images.length > 0 && (
                            <img 
                                src={album.images[0].url} 
                                alt={album.name} 
                                className="img-fluid album-cover mt-5"
                                width={500}
                                height={500}
                            />
                        )}
                    </div>
                    <div className="col-md-6 album-details">
                        <h1>{album.name}</h1>
                        <h2>Artists:</h2>
                        <ul>
                            {album.artists.map((artist) => (
                                <li key={artist.id}>{artist.name}</li>
                            ))}
                        </ul>
                        <h2>Tracks:</h2>
                        <ul>
                            {album.tracks.items.map((track) => (
                                <li key={track.id}>{track.name}</li>
                            ))}
                        </ul>
                        <h2>Release Date:</h2>
                        <p>{album.release_date}</p>
                        <h2>Total Tracks:</h2>
                        <p>{album.total_tracks}</p>
                        <h2>Genres:</h2>
                        <p>{album.genres.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Album;