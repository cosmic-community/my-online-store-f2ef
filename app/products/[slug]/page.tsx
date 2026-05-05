// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  const name = getMetafieldValue(product.metadata?.product_name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const sku = getMetafieldValue(product.metadata?.sku)
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const stockQuantity = product.metadata?.stock_quantity
  const mainImage = product.metadata?.main_image
  const gallery = product.metadata?.gallery || []
  const category = product.metadata?.category
  const variants = product.metadata?.variants || []

  const hasSale = salePrice && price && salePrice < price

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (Number(getMetafieldValue(r.metadata?.rating)) || 0), 0) / reviews.length
    : 0

  return (
    <div className="container-custom py-8 md:py-12">
      <nav className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-gray-900">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
            {mainImage ? (
              <img
                src={`${mainImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
                📦
              </div>
            )}
          </div>
          {gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((img, idx) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${name} ${idx + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-sm font-medium text-gray-600 hover:text-gray-900 mb-3"
            >
              {category.title}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{name}</h1>
          
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm text-gray-600">
                {avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          <div className="mb-6">
            {hasSale ? (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-red-600">${salePrice?.toFixed(2)}</span>
                <span className="text-xl text-gray-500 line-through">${price?.toFixed(2)}</span>
                <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                  Save ${((price || 0) - (salePrice || 0)).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                {price ? `$${price.toFixed(2)}` : 'Price unavailable'}
              </span>
            )}
          </div>

          {description && (
            <div className="prose prose-gray mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          )}

          <div className="space-y-3 py-6 border-t border-b border-gray-200 mb-6">
            {sku && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SKU</span>
                <span className="font-medium text-gray-900">{sku}</span>
              </div>
            )}
            {inventoryStatus && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${
                  inventoryStatus === 'In Stock' ? 'text-green-600' :
                  inventoryStatus === 'Low Stock' ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {inventoryStatus}
                </span>
              </div>
            )}
            {stockQuantity !== undefined && stockQuantity !== null && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">{stockQuantity} units</span>
              </div>
            )}
          </div>

          {variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Available Variants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {variants.map((variant, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 text-sm">
                    {variant.name && <div className="font-medium text-gray-900">{variant.name}</div>}
                    {variant.price && <div className="text-gray-600">${variant.price.toFixed(2)}</div>}
                    {variant.sku && <div className="text-xs text-gray-500">SKU: {variant.sku}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="btn-primary w-full" disabled={inventoryStatus === 'Out of Stock'}>
            {inventoryStatus === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} showProduct={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}