import React, { useState, useEffect } from "react";
import axios from "axios";

const Tracks = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [tracksPerPage] = useState(50);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/tracks/");
                setTracks(response.data.Tracks);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTracks();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset pagination when searching
    };

    const filteredTracks = tracks.filter(
        (track) =>
            track.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastTrack = currentPage * tracksPerPage;
    const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
    const currentTracks = filteredTracks.slice(indexOfFirstTrack, indexOfLastTrack);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredTracks.length / tracksPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nom de la piste</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTracks.map((track) => (
                        <tr key={track.id}>
                            <td>{track.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button onClick={() => paginate(currentPage - 1)} className="page-link">Précédent</button>
                    </li>
                    <li className={`page-item ${currentPage === Math.ceil(filteredTracks.length / tracksPerPage) ? "disabled" : ""}`}>
                        <button onClick={() => paginate(currentPage + 1)} className="page-link">Suivant</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Tracks;
