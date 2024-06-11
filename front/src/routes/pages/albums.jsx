import React, { useState, useEffect } from "react";
import axios from "axios";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/albums/"
                );
                setAlbums(response.data.Albums);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <ul>
                {albums.map((album) => (
                    <li key={album.id}>
                        <img
                            src={album.photo_url}
                            alt=""
                            width={300}
                            height={300}
                        />
                        <p id="album_name">{album.name}</p>
                        <p id="album_artist">{album.artist}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Albums;
