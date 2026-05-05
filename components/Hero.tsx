import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>
      <div className="container-custom relative py-20 md:py-32">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
            ✨ Welcome to My Online Store
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Quality Products,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Great Prices
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            Discover our curated collection of premium products with fast shipping and excellent customer service.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors">
              Shop Now →
            </Link>
            <Link href="/categories" className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}