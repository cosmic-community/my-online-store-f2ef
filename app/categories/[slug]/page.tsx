// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.category_image

  return (
    <>
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {image && (
          <div className="absolute inset-0">
            <img
              src={`${image.imgix_url}?w=2000&h=600&fit=crop&auto=format,compress`}
              alt={name}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/30" />
          </div>
        )}
        <div className="relative container-custom py-16 md:py-24">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-white">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{name}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{name}</h1>
          {description && (
            <p className="text-lg text-gray-200 max-w-2xl">{description}</p>
          )}
        </div>
      </section>

      <div className="container-custom py-12">
        <p className="text-gray-600 mb-8">
          {products.length} {products.length === 1 ? 'product' : 'products'} in this category
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600">No products in this category yet.</p>
          </div>
        )}
      </div>
    </>
  )
}