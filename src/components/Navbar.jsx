import { MapPin, Search, Crown } from 'lucide-react'

export default function Navbar({ onLocate }) {
  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 text-blue-600 font-semibold">
          <Crown size={20} className="text-amber-500" />
          <span>PrimeWash</span>
        </div>
        <div className="flex-1 relative">
          <input
            placeholder="Search cleaners or services"
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
        <button
          onClick={onLocate}
          className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition"
        >
          <MapPin size={16} />
          Locate
        </button>
      </div>
    </div>
  )
}
