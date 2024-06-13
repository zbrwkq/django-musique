import React, { useState } from 'react';
import axios from 'axios';
import { StarFill, Star } from 'react-bootstrap-icons';

const CommentForm = ({ albumId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(`Rating: ${rating}, Comment: ${comment}`);

        try {
            await axios.post('http://127.0.0.1:8000/comments/add/', {
                id_user: 1, 
                rating,
                comment,
                id_album: albumId
            });
            alert('Comment added successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
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
                        required
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
