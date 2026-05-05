import Link from 'next/link'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'
import { getFeaturedProducts, getProducts, getCategories, getReviews } from '@/lib/cosmic'

export default async function HomePage() {
  const [featuredProducts, allProducts, categories, reviews] = await Promise.all([
    getFeaturedProducts(),
    getProducts(),
    getCategories(),
    getReviews(),
  ])

  const displayFeatured = featuredProducts.length > 0 ? featuredProducts.slice(0, 4) : allProducts.slice(0, 4)
  const recentReviews = reviews.slice(0, 3)
  const displayCategories = categories.slice(0, 3)

  return (
    <>
      <Hero />

      {displayCategories.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Shop by Category</h2>
                <p className="text-gray-600 mt-2">Browse our curated collections</p>
              </div>
              <Link href="/categories" className="hidden md:inline text-sm font-semibold text-gray-900 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayCategories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {displayFeatured.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
                <p className="text-gray-600 mt-2">Hand-picked favorites for you</p>
              </div>
              <Link href="/products" className="hidden md:inline text-sm font-semibold text-gray-900 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayFeatured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {recentReviews.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
              <p className="text-gray-600 mt-2">Real reviews from real customers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/reviews" className="btn-secondary">
                Read All Reviews
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}