import { StarFill, Star } from "react-bootstrap-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";

const Comment = ({ comment, onDelete }) => {
  const { id_user, rating, comment: commentText, date } = comment;
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    if (auth.token) {
      const decodedToken = jwtDecode(auth.token);
      setUserId(decodedToken.user_id);
    }
  }, [auth.token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/get/${id_user}/`
        );
        setUser(response.data.User);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) =>
      index < rating ? (
        <StarFill key={index} color="gold" size={24} />
      ) : (
        <Star key={index} color="gold" size={24} />
      )
    );
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Êtes vous sur de vouloir supprimer ce commentaire?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/comments/delete/${comment.id}/`
        );

        onDelete(comment.id);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comment mb-3 p-3 border rounded bg-dark">
      {id_user == userId ? (
        <button
          className="btn btn-outline-danger btn-sm my-btn-suppr"
          onClick={handleDelete}
        >
          Delete
        </button>
      ) : (
        <></>
      )}

      <p>
        <strong>{user.username}</strong>
      </p>
      <div className="d-flex align-items-center">
        <span className="mr-2">Note : </span>
        {renderStars(rating)}
      </div>
      <p className="mt-2">Date: {new Date(date).toLocaleDateString()}</p>
      <div className="mt-2">
        <input
          type="text"
          className="form-control"
          value={commentText}
          disabled
        />
      </div>
    </div>
  );
};

export default Comment;
