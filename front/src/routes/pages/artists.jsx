import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [artistsPerPage] = useState(20);
  const [likes, setLikes] = useState([]);

  const auth = useAuth();

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

  useEffect(() => {
    if (auth.token) {
      const decodedToken = jwtDecode(auth.token);
      const userId = decodedToken.user_id;

      const fetchArtistsLikes = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/likes/user/artists/" + userId
          );
          setLikes(response.data.liked_artists);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchArtistsLikes();
    }
  }, [auth.token]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleLike = async (artistId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/likes/like_artist/${artistId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (response.data.message === "Like ajouté") {
        setLikes([...likes, artistId]);
      } else {
        setLikes(likes.filter((id) => id !== artistId));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = filteredArtists.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );

  const paginate = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(filteredArtists.length / artistsPerPage)
    ) {
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
            <NavLink to={`/artist/${artist.spotify_id}`}>
              <img src={artist.photo_url} alt="" width={300} height={300} />
            </NavLink>
            <p id="artist_name">{artist.name}</p>
            {auth.token && (
              <FontAwesomeIcon
                icon={faHeart}
                onClick={() => handleLike(artist.id)}
                style={{
                  color: likes.includes(artist.id) ? "red" : "grey",
                  cursor: "pointer",
                }}
              />
            )}
          </li>
        ))}
      </ul>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link"
            >
              Précédent
            </button>
          </li>
          <li
            className={`page-item ${
              currentPage === Math.ceil(filteredArtists.length / artistsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link"
            >
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Artists;
