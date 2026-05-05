export default function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating)
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }

  return (
    <div className={`flex items-center gap-0.5 ${sizeClasses[size]}`}>
      {stars.map((filled, index) => (
        <span key={index} className={filled ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  )
}