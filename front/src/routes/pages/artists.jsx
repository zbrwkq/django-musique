import React, { useState, useEffect } from "react";
import axios from "axios";

const Artists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/artists/"
                );
                setArtists(response.data.Artists);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>
                        <img
                            src={artist.photo_url}
                            alt=""
                            width={300}
                            height={300}
                        />
                        <p id="artist_name">{artist.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Artists;
