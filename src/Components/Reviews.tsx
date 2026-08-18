'use client';

import { useState, useEffect } from 'react';

const clientReviews = [
    {
      id: 'arinda-kukyaala',
      clientName: "Arinda",
      eventType: "Kukyaala",
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

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5 text-[1.2rem] text-[var(--secondary-text)]">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-[var(--secondary-text)]'}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: typeof clientReviews[0] }) => {
  return (
    <div className="bg-[var(--card-bg)] p-6 rounded-lg max-w-[600px] mx-auto my-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[var(--text-color)] font-semibold text-lg">
          {review.clientName}
        </h4>
        <StarRating rating={review.rating} />
      </div>
      <p className="italic leading-relaxed text-[var(--text-color)]">
        "{review.review}"
      </p>
      <p className="text-right text-sm text-[var(--date-text)] mt-4">
        {new Date(review.date).toLocaleDateString()}
      </p>
    </div>
  );
};

const ReviewsSlider = ({ reviews }: { reviews: typeof clientReviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-[800px] mx-auto overflow-hidden min-h-[300px]">
      {/* Slider content */}
      <div className="relative w-full h-full">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`w-full px-4 box-border transition-opacity duration-500 ease-in-out absolute top-0 left-0 ${
              index === currentIndex ? 'opacity-100 relative' : 'opacity-0'
            }`}
            style={{ position: index === currentIndex ? 'relative' : 'absolute' }}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevReview}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-[var(--text-color)] text-3xl hover:text-[var(--accent-color)] hover:bg-black/10 transition-colors"
        aria-label="Previous review"
      >
        ‹
      </button>
      <button
        onClick={nextReview}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-[var(--text-color)] text-3xl hover:text-[var(--accent-color)] hover:bg-black/10 transition-colors"
        aria-label="Next review"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full border-none p-0 transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[var(--accent-color)] scale-110'
                : 'bg-[var(--secondary-text)]'
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const AlbumReview = ({ albumId }: { albumId: string }) => {
  const review = clientReviews.find((r) => r.id === albumId);
  if (!review) return null;

  return (
    <div className="max-w-[600px] mx-auto my-8 bg-[var(--card-bg)] p-6 rounded-lg">
      <h3 className="text-[var(--text-color)] border-b border-[var(--border-color)] pb-2 mb-4 font-semibold">
        Client Feedback
      </h3>
      <ReviewCard review={review} />
    </div>
  );
};

// Main component
const Reviews = ({
  albumId,
  showAll,
}: {
  albumId?: string;
  showAll?: boolean;
}) => {
  return (
    <div className="my-8 px-4">
      {showAll ? (
        <div className="p-4 bg-[var(--card-bg)] rounded-lg">
          <h2 className="text-center text-[var(--text-color)] text-2xl font-semibold mb-6">
            Client Testimonials
          </h2>
          <ReviewsSlider reviews={clientReviews} />
        </div>
      ) : (
        <AlbumReview albumId={albumId!} />
      )}
    </div>
  );
};

export default Reviews;
export { clientReviews };

