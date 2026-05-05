import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span className="text-2xl">🛍️</span>
            <span>My Online Store</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Categories
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Reviews
            </Link>
          </nav>

          <div className="flex md:hidden items-center gap-4">
            <Link href="/products" className="text-sm font-medium text-gray-700">Shop</Link>
          </div>
        </div>
      </div>
    </header>
  )
}