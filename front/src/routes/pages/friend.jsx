import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import jwtDecode from "jwt-decode"; // Corrigé l'import de jwt-decode
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Friend = () => {
    const auth = useAuth();
    const { friendId } = useParams();
    
    const [error, setError] = useState(null);
    
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    
    const [user, setUser] = useState()
    const [searchFilter, setSearchFilter] = useState('Albums');

    let tracksIds = [];

    // Fonctions de récupération des données
    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/likes/user/albums/${friendId}`);
            const albumsIds = response.data.liked_albums;
  
            const albumsData = [];
            const albumPromises = albumsIds.map(async (albumId) => {
                const albumResponse = await axios.get(`http://127.0.0.1:8000/albums/get/${albumId}`);
                albumsData.push(albumResponse.data.Album);
            });
    
            await Promise.all(albumPromises);
            setAlbums(albumsData);
        } catch (err) {
            setError(err.message);
        }
    }
    

    const fetchArtists = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/likes/user/artists/${friendId}`);
            const artistsIds = response.data.liked_artists;

            const artistsData = [];
            const artistPromises = artistsIds.map(async (artistId) => {
                const artistResponse = await axios.get(`http://127.0.0.1:8000/artists/get/${artistId}`);
                artistsData.push(artistResponse.data.Artist);
            });

            await Promise.all(artistPromises);
            setArtists(artistsData);
        } catch (err) {
            setError(err.message);
        }
    }

    const fetchTracks = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/likes/user/tracks/${friendId}`);
            const tracksIds = response.data.liked_tracks;
            console.log(tracksIds)

            const tracksData = [];
            const trackPromises = tracksIds.map(async (trackId) => {
                const trackResponse = await axios.get(`http://127.0.0.1:8000/tracks/get/${trackId}`);
                tracksData.push(trackResponse.data.Track);
            });

            console.log(tracksData)

            await Promise.all(trackPromises);
            setTracks(tracksData);
        } catch (err) {
            setError(err.message);
        }
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/users/get/${friendId}`);
            setUser(response.data.User || []);
        } catch (err) {
            setError("L'utilisateur n'existe pas !");
        }
    }

    // État initial de la page
    useEffect(() => {
        if (auth.token) {
            fetchUser();
            // Récupérer les albums de l'utilisateur à visualiser par défaut
            fetchAlbums(); 
        }
    }, [auth.token]);

    // Au click sur un bouton on charge les autres données (Artistes, Musiques, Albums)
    useEffect(() => {
        setError(null);
        switch (searchFilter) {
            case 'Artistes':
                fetchArtists();
                break;
            case 'Albums':
                fetchAlbums();
                break;
            case 'Musiques':
                fetchTracks();
                break;
            default:
                break;
        }
    }, [searchFilter]);

    const renderAlbumContent = () => {
        if (!albums.length) {
            return <p>Cet utilisateur n'a pas encore liké d'album</p>;
        }
        return albums.map((album) => (
            <Col key={album.id} md={4} className="mb-4">
                <div className="card">
                    <img src={album.photo_url} className="card-img-top" alt={album.name} />
                    <div className="card-body">
                        <h5 className="card-title">{album.name}</h5>
                        <p className="card-text">{album.artist}</p>
                    </div>
                </div>
            </Col>
        ));
    }

    const renderTrackContent = () => {
        if (!tracks.length) {
            return <p>Cet utilisateur n'a pas encore liké de musique</p>;
        }

        return (
            <table className="table">
            <thead>
            <tr>
                <th scope="col">Nom de la piste</th>
                <th scope="col">Like</th>
            </tr>
            </thead>
            <tbody>
            {tracks.map((track) => (
                <tr key={track.spotify_id}>
                <td>
                    {" "}
                    <NavLink to={`/track/${track.spotify_id}`}>
                    {track.name}
                    </NavLink>
                </td>
                <td>
                    {auth.token && (
                    <FontAwesomeIcon
                        icon={faHeart}
                        style={{
                        color: "red",
                        cursor: "pointer",
                        }}
                    />
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        )
    }

    const renderArtistContent = () => {
        if (!artists.length) {
            return <p>Cet utilisateur n'a pas encore liké d'artiste</p>;
        }
        return artists.map((artist) => (
            <Col key={artist.id} md={4} className="mb-4">
                <div className="card">
                    <img src={artist.photo_url} className="card-img-top" alt={artist.name} />
                    <div className="card-body">
                        <h5 className="card-title">{artist.name}</h5>
                    </div>
                </div>
            </Col>
        ));
    }

    const renderContent = () => {
        switch (searchFilter) {
            case 'Artistes':
                return renderArtistContent();
            case 'Albums':
                return renderAlbumContent();
            case 'Musiques':
                return renderTrackContent();
            default:
                return <div>Invalid search filter</div>;
        }
    }

    return (
        <Container className="pt-3">
            <Row className="my-3">
                <Col>
                    <Button variant="primary" onClick={() => setSearchFilter('Albums')} className="me-2">Albums</Button>
                    <Button variant="primary" onClick={() => setSearchFilter('Musiques')} className="me-2">Musiques</Button>
                    <Button variant="primary" onClick={() => setSearchFilter('Artistes')}>Artistes</Button>
                </Col>
            </Row>

            {user ? (
                <h3 className="my-3 mt-5">{searchFilter} likés par {user.username}</h3>
            ) : (
                <h3 className="my-3 mt-5">Chargement des informations de l'utilisateur...</h3>
            )}

            <Row>
                {renderContent()}
            </Row>

            {error && <div className="alert alert-danger">{error}</div>}
        </Container>
    );
}

export default Friend;
