import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CommentForm from "../../components/CommentForm";
import Comment from "../../components/Comment";
import { StarFill, HeartFill } from "react-bootstrap-icons";

const Track = ({ trackId }) => {
  const [track, setTrack] = useState(null);
  const [comments, setComments] = useState([]);
  const [addComments, setAddComments] = useState(false);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [averageRating, setAverageRating] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/tracks/${id}/`);
        setTrack(response.data);
      } catch (err) {
        setError("Failed to fetch track details");
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/likes/track/${id}/`
        );
        setLikes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchTrack();
    fetchLikes();
  }, [trackId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/comments/track/${id}/`
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

  if (error) {
    console.log(error);
  }

  if (!track) {
    return <div>Loading...</div>;
  }
  return (
    <div id="preview-page" className="w-100 pt-5">
      <div className="background"></div>
      <div className="track-container container text-white mt-5">
        <div className="text-center">
          <h1>{track.name}</h1>
          <h3 className="text-muted">
            {track.artists.map((artist, index) => (
              <NavLink to={`/artist/${artist.id}`} key={artist.id}>
                {artist.name}
                {index < track.artists.length - 1 ? ", " : ""}
              </NavLink>
            ))}
          </h3>
        </div>
        <div className="row">
          <div className="col-md-6 text-center">
            {track.album.images && track.album.images.length > 0 && (
              <img
                src={track.album.images[0].url}
                alt={track.album.name}
                className="img-fluid track-cover mt-5"
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
            <h2 style={{ textTransform: "capitalize" }}>
              {track.album.album_type}:
            </h2>
            <NavLink to={`/album/${track.album.id}`}>
              {track.album.name}
            </NavLink>
          </div>
          <div className="col-md-3 album-details mt-5">
            <h2>Release Date :</h2>
            <p>{track.album.release_date}</p>
            <h2>Preview :</h2>
            {track.preview_url && (
              <audio controls>
                <source src={track.preview_url} type="audio/mpeg" />
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
            )}
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <CommentForm trackId={id} onAdd={handleAddComment} />
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

export default Track;
