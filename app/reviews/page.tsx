import ReviewCard from '@/components/ReviewCard'
import { getReviews, getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

export const metadata = {
  title: 'Customer Reviews - My Online Store',
  description: 'Read what our customers have to say about our products.',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (Number(getMetafieldValue(r.metadata?.rating)) || 0), 0) / reviews.length
    : 0

  return (
    <div className="container-custom py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
        <p className="text-gray-600 mb-4">What our customers are saying</p>
        {reviews.length > 0 && (
          <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-6 py-3">
            <StarRating rating={Math.round(avgRating)} size="lg" />
            <span className="font-bold text-lg text-gray-900">{avgRating.toFixed(1)}</span>
            <span className="text-gray-600">
              ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
        </div>
      )}
    </div>
  )
}