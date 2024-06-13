import React, { useState } from 'react';
import axios from 'axios';
import { StarFill, Star } from 'react-bootstrap-icons';
import { useAuth } from "../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";

const CommentForm = ({ albumId, onAdd, artistId, trackId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    const auth = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const decodedToken = jwtDecode(auth.token);
        const userId = decodedToken.user_id;
    
        try {
            var response = await axios.post('http://127.0.0.1:8000/comments/add/', {
                id_user: userId, 
                rating,
                comment,
                id_album: albumId,
                id_artist: artistId,
                id_track: trackId,
            },{
                headers: { Authorization: `Bearer ${auth.token}` }
            } );
            onAdd(response.data);
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            alert("L'ajout du commentaire a échoué. Essayez de nouveau.");
        }
    };

    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleMouseEnter = (hoveredRating) => {
        setHoverRating(hoveredRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    if (!auth.token) {
        return (
            <div>
                Veuillez vous <a href="../login">Connecter</a> ou vous  <a href="../register">Inscrire</a> pour pouvoir donner un avis
            </div>
        )
    }

    return (
        <div className="mt-5">
            <h2>Ajoute ton commentaire</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="rating">Note:</label>
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => { 
                            return <StarIcon
                                key={star}
                                index={star}
                                rating={rating}
                                hoverRating={hoverRating}
                                onClick={handleRatingClick}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                        })}
                    </div>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="comment">Commentaire:</label>
                    <textarea
                        className="form-control input-inverse" 
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Envoyer</button>
            </form>
        </div>
    );
};

const StarIcon = ({ index, rating, hoverRating, onClick, onMouseEnter, onMouseLeave }) => {
    const isFilled = index <= (hoverRating || rating);

    return (
        <span
            onClick={() => onClick(index)}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
            style={{ cursor: 'pointer' }}
        >
            {isFilled ? <StarFill color="gold" size={24} /> : <Star color="gold" size={24} />}
        </span>
    );
};

export default CommentForm;
