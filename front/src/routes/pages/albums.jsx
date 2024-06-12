import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [likes, setLikes] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/albums/");
                setAlbums(response.data.Albums);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAlbums();
    }, []);

    const handleLike = async (albumId) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/likes/like/${albumId}/`, {
            });
            setLikes(prevLikes => ({
                ...prevLikes,
                [albumId]: !prevLikes[albumId]
            }));
            console.log(response.data.message);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="w-100 container">
            <ul className="w-100 d-flex flex-wrap justify-content-between">
                {albums.map((album) => (
                    <li key={album.id} style={{ listStyle: "none" }}>
                        <img src={album.photo_url} alt="" width={300} height={300} />
                        <p id="album_name">{album.name}</p>
                        <p id="album_artist">{album.artist}</p>
                        <FontAwesomeIcon
                            icon={faHeart}
                            onClick={() => handleLike(album.id)}
                            style={{ color: likes[album.id] ? "red" : "grey", cursor: "pointer" }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Albums;
