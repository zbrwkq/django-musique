import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/searchBar";

const Tracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedTracks, setLikedTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tracksPerPage] = useState(10);

  const auth = useAuth();

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

  useEffect(() => {
    if (auth.token) {
      const decodedToken = jwtDecode(auth.token);
      const userId = decodedToken.user_id;

      const fetchLikedTracks = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/likes/user/tracks/${userId}`
          );
          setLikedTracks(response.data.liked_tracks);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchLikedTracks();
    }
  }, [auth.token]);

  const handleLike = async (trackId, event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/likes/like_track/${trackId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (response.data.message === "Like ajouté") {
        setLikedTracks((prevLikedTracks) => [...prevLikedTracks, trackId]);
      } else {
        setLikedTracks((prevLikedTracks) =>
          prevLikedTracks.filter((id) => id !== trackId)
        );
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredTracks = tracks.filter((track) =>
    track.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTrack = currentPage * tracksPerPage;
  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
  const currentTracks = filteredTracks.slice(
    indexOfFirstTrack,
    indexOfLastTrack
  );

  const paginate = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(filteredTracks.length / tracksPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="w-100 container">
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nom de la piste</th>
            <th scope="col">Like</th>
          </tr>
        </thead>
        <tbody>
          {currentTracks.map((track) => (
            <tr key={track.spotify_id}>
              <td>
                <NavLink to={`/track/${track.spotify_id}`}>
                  {track.name}
                </NavLink>
              </td>
              <td>
                {auth.token && (
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={(e) => handleLike(track.id, e)}
                    style={{
                      color: likedTracks.includes(track.id) ? "red" : "grey",
                      cursor: "pointer",
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button onClick={() => paginate("prev")} className="page-link">
              Précédent
            </button>
          </li>
          <li
            className={`page-item ${
              currentPage === Math.ceil(filteredTracks.length / tracksPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button onClick={() => paginate("next")} className="page-link">
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Tracks;
