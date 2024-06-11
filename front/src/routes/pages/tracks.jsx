import React, { useState, useEffect } from "react";
import axios from "axios";

const Tracks = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/tracks/"
                );
                setTracks(response.data.Tracks);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTracks();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <ul>
                {tracks.map((track) => (
                    <li key={track.id}>
                        <p id="track_name">{track.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tracks;
