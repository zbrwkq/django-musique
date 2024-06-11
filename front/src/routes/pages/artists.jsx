import React, { useState, useEffect } from "react";
import axios from "axios";

const Artists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [artistsPerPage] = useState(20);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/artists/");
                setArtists(response.data.Artists);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset pagination when searching
    };

    const filteredArtists = artists.filter(
        (artist) =>
            artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastArtist = currentPage * artistsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    const currentArtists = filteredArtists.slice(indexOfFirstArtist, indexOfLastArtist);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredArtists.length / artistsPerPage)) {
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
                {currentArtists.map((artist) => (
                    <li key={artist.id} style={{ listStyle: "none" }}>
                        <img src={artist.photo_url} alt="" width={300} height={300} />
                        <p id="artist_name">{artist.name}</p>
                    </li>
                ))}
            </ul>
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button onClick={() => paginate(currentPage - 1)} className="page-link">Précédent</button>
                    </li>
                    <li className={`page-item ${currentPage === Math.ceil(filteredArtists.length / artistsPerPage) ? "disabled" : ""}`}>
                        <button onClick={() => paginate(currentPage + 1)} className="page-link">Suivant</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Artists;
