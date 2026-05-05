import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/cosmic'

export const metadata = {
  title: 'All Products - My Online Store',
  description: 'Browse our full collection of quality products.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container-custom py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? 'product' : 'products'} available
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600">No products available at the moment.</p>
        </div>
      )}
    </div>
  )
}