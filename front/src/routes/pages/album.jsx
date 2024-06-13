import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import CommentForm from "../../components/CommentForm";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../hooks/AuthProvider";

const Album = ({ albumId }) => {
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const auth = useAuth();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/albums/${id}/`);
        setAlbum(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch album details");
      }
    };

    fetchAlbum();
  }, [albumId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id="preview-page"
      className="w-100 pt-5"
      style={{ height: "100vh", backgroundColor: "#1a1a1a", color: "#ffffff" }}
    >
      <div className="album-container container text-white mt-5">
        <div className="text-center">
          <h1>{album.name}</h1>
          <h3>
            {album.artists.map((artist, index) => (
              <NavLink to={`/artist/${artist.id}`} key={artist.id}>
                {artist.name}
                {index < album.artists.length - 1 ? "," : ""}
              </NavLink>
            ))}
          </h3>
        </div>
        <div className="row">
          <div className="col-md-6 text-center">
            {album.images && album.images.length > 0 && (
              <img
                src={album.images[0].url}
                alt={album.name}
                className="img-fluid album-cover mt-5"
                width={500}
                height={500}
              />
            )}
          </div>
          <div className="col-md-3 album-details mt-5">
            <h2>Tracks:</h2>
            <ul>
              {album.tracks.items.map((track) => (
                <li key={track.id}>{track.name}</li>
              ))}
            </ul>
          </div>

          <div className="col-md-3 album-details mt-5">
            <h2>Release Date:</h2>
            <p>{album.release_date}</p>
            <h2>Label</h2>
            <p>{album.label}</p>
            <h2>Genres:</h2>
            <p>{album.genres.join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <CommentForm albumId={albumId} />
      </div>
    </div>
  );
};

export default Album;
