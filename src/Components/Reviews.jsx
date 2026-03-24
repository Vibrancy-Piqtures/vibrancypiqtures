import React, { useState, useEffect } from 'react';
import './Reviews.css'; 

const clientReviews = [
  {
    id: 'arinda-kukyala',
    clientName: "Arinda",
    eventType: "Kukyala",
    rating: 5,
    review: "Absolutely stunning photos! You captured every special moment perfectly.",
    date: "2024-06-15"
  },
  {
    id: 'diana-joseph-kuhingira', 
    clientName: "Diana",
    eventType: "Kuhingira",
    rating: 5,
    review: "The photos are beyond our expectations. You made us feel so comfortable!",
    date: "2023-08-22"
  },
    {
        id: 'sarah-mike-pre-wedding',
        clientName: "Mike",
        eventType: "Pre-Wedding",
        rating: 5,
        review: "Incredible work! The pre-wedding shoot was so much fun and the photos turned out amazing.",
        date: "2023-08-10"
    },
    {
        id: 'liz-james-kwanjura',
        clientName: "James",
        eventType: "Kwanjura",
        rating: 5,
        review: "We are so happy with our wedding photos! The team was professional and made us feel comfortable.",
        date: "2024-07-05"
    },
    {
        id: 'Liz-James-pre-wedding-photoshoot',
        clientName: "Elizabeth",
        eventType: "Pre-Wedding",
        rating: 4,
        review: "Great experience overall. The photos are lovely, but we had to wait a bit longer than expected for the final edits.",
        date: "2024-09-15"
    },
    {
        id: 'sarah-mike-kwanjura',
        clientName: "Sarah",
        eventType: "Kwanjura",
        rating: 5,
        review: "The photos are breathtaking! You captured our day beautifully. Thank you!",
        date: "2025-01-21"
    }
];

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
      ))}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <h4>{review.clientName}</h4>
        <StarRating rating={review.rating} />
      </div>
      <p className="review-text">"{review.review}"</p>
      <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
    </div>
  );
};

const ReviewsSlider = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reviews-slider">
      <button onClick={prevReview} className="slider-arrow left">‹</button>
      
      <div className="slider-content">
        {reviews.map((review, index) => (
          <div 
            key={index}
            className={`review-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      
      <button onClick={nextReview} className="slider-arrow right">›</button>
      
      <div className="slider-dots">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const AlbumReview = ({ albumId }) => {
  const review = clientReviews.find(r => r.id === albumId);
  
  if (!review) return null;
  
  return (
    <div className="album-review">
      <h3>Client Feedback</h3>
      <ReviewCard review={review} />
    </div>
  );
};

const Reviews = ({ albumId, showAll }) => {
  return (
    <div className="reviews-container">
      {showAll ? (
        <div className="all-reviews-section">
          <h2>Client Testimonials</h2>
          <ReviewsSlider reviews={clientReviews} />
        </div>
      ) : (
        <AlbumReview albumId={albumId} />
      )}
    </div>
  );
};

export default Reviews;
export { clientReviews }; 
