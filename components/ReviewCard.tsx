import Link from 'next/link'
import { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

export default function ReviewCard({ review, showProduct = true }: { review: Review; showProduct?: boolean }) {
  if (!review) return null

  const customerName = getMetafieldValue(review.metadata?.customer_name)
  const rating = Number(getMetafieldValue(review.metadata?.rating)) || 0
  const reviewTitle = getMetafieldValue(review.metadata?.review_title)
  const reviewText = getMetafieldValue(review.metadata?.review_text)
  const verified = review.metadata?.verified_purchase
  const product = review.metadata?.product

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <StarRating rating={rating} />
          {reviewTitle && (
            <h3 className="font-bold text-gray-900 mt-2">{reviewTitle}</h3>
          )}
        </div>
        {verified && (
          <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
            ✓ Verified
          </span>
        )}
      </div>
      {reviewText && (
        <p className="text-gray-700 leading-relaxed mb-4">{reviewText}</p>
      )}
      <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4">
        <span className="font-medium text-gray-900">
          {customerName || 'Anonymous'}
        </span>
        {showProduct && product && (
          <Link
            href={`/products/${product.slug}`}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            {product.title} →
          </Link>
        )}
      </div>
    </div>
  )
}