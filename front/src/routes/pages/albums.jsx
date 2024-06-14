import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/searchBar";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");

  const auth = useAuth();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/albums/");
        setAlbums(response.data.Albums);
      } catch (err) {
        setError("Failed to fetch albums");
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    if (auth.token) {
      const decodedToken = jwtDecode(auth.token);
      const userId = decodedToken.user_id;

      const fetchLikedAlbums = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/likes/user/albums/${userId}`
          );
          setLikedAlbums(response.data.liked_albums);
        } catch (err) {
          setError("Failed to fetch liked albums");
        }
      };

      fetchLikedAlbums();
    }
  }, [auth.token]);

  const handleLike = async (albumId, event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/likes/like/${albumId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (response.data.message === "Like ajouté") {
        setLikedAlbums([...likedAlbums, albumId]);
      } else {
        setLikedAlbums(likedAlbums.filter((id) => id !== albumId));
      }
    } catch (err) {
      console.error("Error liking album:", err.message);
    }
  };

  // Pagination logic
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums
    .filter(
      (album) =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstAlbum, indexOfLastAlbum);

  const nextPage = () => {
    if (currentPage < Math.ceil(albums.length / albumsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  return (
    <div className="w-100 container">
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <ul className="w-100 d-flex flex-wrap justify-content-between">
        {currentAlbums.map((album) => (
          <li
            key={album.id}
            className="mb-3"
            style={{ listStyle: "none", width: "300px" }}
          >
            <NavLink to={`/album/${album.id_album}`}>
              <img src={album.photo_url} alt="" width={300} height={300} />
              <p
                id="album_name"
                className="display-6 m-0"
                style={{ textWrap: "balance" }}
              >
                {album.name}
                {auth.token && (
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={(e) => handleLike(album.id, e)}
                    style={{
                      color: likedAlbums.includes(album.id) ? "red" : "grey",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                    }}
                    className="mx-3"
                  />
                )}
              </p>
            </NavLink>
            <NavLink to={`/artist/${album.id_artist}`} id="album_artist">
              <p className="m-0">{album.artist}</p>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="pagination-buttons d-flex justify-content-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="btn btn-primary"
        >
          Précédent
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(albums.length / albumsPerPage)}
          className="btn btn-primary"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Albums;
