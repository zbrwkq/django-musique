import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [error, setError] = useState(null);

  const auth = useAuth();

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
          setError(err.message);
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
      console.error(err.message);
    }
  };

  return (
    <div className="w-100 container">
      <ul className="w-100 d-flex flex-wrap justify-content-between">
        {albums.map((album) => (
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
    </div>
  );
};

export default Albums;
