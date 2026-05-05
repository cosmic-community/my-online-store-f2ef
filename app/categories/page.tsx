import CategoryCard from '@/components/CategoryCard'
import { getCategories } from '@/lib/cosmic'

export const metadata = {
  title: 'Categories - My Online Store',
  description: 'Browse all product categories.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container-custom py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600">Browse our product collections</p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600">No categories available at the moment.</p>
        </div>
      )}
    </div>
  )
}