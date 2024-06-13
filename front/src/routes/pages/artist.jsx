import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

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
    <Container>
      <div
        id="artist-page"
        className="w-100"
        style={{
          height: "100vh",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        }}
      >
        <div className="artist-container container text-white">
          <div className="row">
            <div className="col-md-6 text-center pt-5">
              {artist.photo_url && artist.photo_url.length > 0 && (
                <img
                  src={artist.photo_url[0].url}
                  alt={artist.name}
                  className="img-fluid artist-cover mt-5"
                  width={500}
                  height={500}
                />
              )}
            </div>
            <div className="col-md-6 artist-details">
              <h1>{artist.name}</h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Artist;
