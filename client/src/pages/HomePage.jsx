import { Link } from 'react-router'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 flex items-center justify-center px-6 py-16">
      <div className="text-center max-w-3xl">
        
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium shadow-sm">
          ✨ New Collection 2025
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Discover Your <span className="text-rose-600">Style</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
          Trendy, elegant and timeless pieces — find the perfect outfit for every season.
        </p>

        {/* CTA Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore Collection
          <span className="text-xl">→</span>
        </Link>

        {/* Decorative Elements */}
        <div className="mt-14 flex justify-center gap-6 opacity-70">
          <div className="w-24 h-32 bg-rose-200 rounded-2xl shadow-inner" />
          <div className="w-24 h-32 bg-rose-300 rounded-2xl shadow-inner" />
          <div className="w-24 h-32 bg-rose-200 rounded-2xl shadow-inner" />
        </div>
      </div>
    </div>
  );
}
