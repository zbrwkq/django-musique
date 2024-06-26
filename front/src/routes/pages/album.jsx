import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import CommentForm from "../../components/CommentForm";
import Comment from "../../components/Comment";
import { StarFill, HeartFill } from "react-bootstrap-icons";

const Album = () => {
  const [album, setAlbum] = useState(null);
  const [comments, setComments] = useState([]);
  const [addComments, setAddComments] = useState(false);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [averageRating, setAverageRating] = useState(null);

  console.log(album);

  const { id } = useParams();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/albums/${id}/`);
        setAlbum(response.data);
      } catch (err) {
        setError("Failed to fetch album details");
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/likes/album/${id}/`
        );
        setLikes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchAlbum();
    fetchLikes();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/comments/album/${id}/`
        );
        const fetchedComments = response.data.reverse();
        setComments(fetchedComments);

        const totalRating = fetchedComments.reduce(
          (sum, comment) => sum + comment.rating,
          0
        );
        const averageRating =
          fetchedComments.length > 0 ? totalRating / fetchedComments.length : 0;
        setAverageRating(averageRating);
        setAddComments(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchComments();
  }, [addComments]);

  const handleAddComment = (newComment) => {
    setAddComments(true);
  };

  const handleDeleteComment = (deletedCommentId) => {
    setComments(comments.filter((comment) => comment.id !== deletedCommentId));
  };

  if (!album) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }
  return (
    <div id="album-page" className="w-100 pt-5">
      <div className="background"></div>
      <div className="album-container container text-white mt-5">
        <div className="text-center">
          <h1>{album.name}</h1>
          <h3 className="text-muted">
            {album.artists.map((artist, index) => (
              <NavLink to={`/artist/${artist.id}`} key={artist.id}>
                {artist.name}
                {index < album.artists.length - 1 ? ", " : ""}
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

            <p className="lead m-3">
              <HeartFill color="pink" /> :{" "}
              <span>{likes ? likes.length : 0}</span> <StarFill color="gold" />{" "}
              : <span>{averageRating ? averageRating.toFixed(1) : 0}</span>
            </p>
          </div>
          <div className="col-md-3 album-details mt-5">
            <h2>Tracks :</h2>
            <ul>
              {album.tracks.items.map((track) => (
                <li key={track.id}>
                  <NavLink to={`/track/${track.id}`}>{track.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-3 album-details mt-5">
            <h2>Date de sortie :</h2>
            <p>{album.release_date}</p>
            {album.genres.length > 0 && (
              <>
                <h2>Genres :</h2>
                <p>{album.genres.join(", ")}</p>
              </>
            )}
            <h2>Label :</h2>
            <p>{album.label}</p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <CommentForm albumId={id} onAdd={handleAddComment} />
      </div>

      <div className="container mt-5 mb-5">
        <h2>Commentaires</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onDelete={handleDeleteComment}
            />
          ))
        ) : (
          <p>Pas de commentaire, soyez le premier à noter cet album !</p>
        )}
      </div>
      <br />
    </div>
  );
};

export default Album;
