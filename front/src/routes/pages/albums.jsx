import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage] = useState(20);
    const [likes, setLikes] = useState({});

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/albums/");
                setAlbums(response.data.Albums);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset pagination when searching
    };

    const handleLike = (id) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [id]: !prevLikes[id]
        }));
    };

    const filteredAlbums = albums.filter(
        (album) =>
            album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            album.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredAlbums.length / albumsPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div className="w-100 container">
            <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul className="w-100 d-flex flex-wrap justify-content-between">
                {currentAlbums.map((album) => (
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
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button onClick={() => paginate(currentPage - 1)} className="page-link">Précédent</button>
                    </li>
                    <li className={`page-item ${currentPage === Math.ceil(filteredAlbums.length / albumsPerPage) ? "disabled" : ""}`}>
                        <button onClick={() => paginate(currentPage + 1)} className="page-link">Suivant</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Albums;
