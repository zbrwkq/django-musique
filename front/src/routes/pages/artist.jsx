import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const Artist = ({ artistId }) => {
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchartist = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/artists/${id}/`
        );
        setArtist(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch artist details");
      }
    };

    fetchartist();
  }, [artistId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!artist) {
    return <div>Loading...</div>;
  }
  return (
    <div
      id="preview-page"
      className="w-100 pt-5"
      style={{
        height: "100vh",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
      }}
    >
      <div className="artist-container container text-white mt-5">
        <div className="text-center">
          <h1>{artist.name}</h1>
        </div>
        <div className="row">
          <div className="col-md-6 text-center">
            {artist.images && artist.images.length > 0 && (
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="img-fluid artist-cover mt-5"
                width={500}
                height={500}
              />
            )}
          </div>
          <div className="col-md-3 artist-details mt-5">
            <h2>Top Tracks:</h2>
            <ul>
              {artist.top_tracks.tracks.map((track) => (
                <li key={track.id}>
                  <NavLink to={`/track/${track.id}`}>{track.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-3 album-details mt-5">
            <h2>Genres:</h2>
            <p>{artist.genres.join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2>Derniers albums</h2>
        <div className="w-100 d-flex flex-wrap justify-content-between">
          {artist.albums.items.map((album) => (
            <NavLink
              to={`/album/${album.id}`}
              key={album.id}
              style={{
                width: "300px",
              }}
            >
              <img src={album.images[0].url} alt="" width={300} height={300} />
              <p id="album_name">{album.name}</p>
              <p id="album_artist">{album.artist}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
