import Link from 'next/link'
import { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null

  const name = getMetafieldValue(product.metadata?.product_name) || product.title
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const image = product.metadata?.main_image
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const featured = product.metadata?.featured

  const hasSale = salePrice && price && salePrice < price

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {image ? (
            <img
              src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
              📦
            </div>
          )}
          {featured && (
            <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
              ⭐ Featured
            </span>
          )}
          {hasSale && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
            {name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            {hasSale ? (
              <>
                <span className="text-lg font-bold text-red-600">${salePrice?.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${price?.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {price ? `$${price.toFixed(2)}` : 'Price unavailable'}
              </span>
            )}
          </div>
          {inventoryStatus && (
            <div className="mt-2">
              <span className={`text-xs font-medium ${
                inventoryStatus === 'In Stock' ? 'text-green-600' :
                inventoryStatus === 'Low Stock' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {inventoryStatus}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}