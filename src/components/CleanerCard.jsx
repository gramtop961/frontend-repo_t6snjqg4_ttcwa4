import { Star, Clock, MapPin } from 'lucide-react'

export default function CleanerCard({ cleaner, onBook }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      {cleaner.photo_url && (
        <img src={cleaner.photo_url} alt={cleaner.name} className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{cleaner.name}</h3>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} />
              <span className="text-sm font-medium text-gray-700">{cleaner.rating.toFixed(1)} • {cleaner.total_reviews} reviews</span>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${cleaner.is_available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {cleaner.is_available ? 'Available' : 'Offline'}
          </span>
        </div>

        <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
          <MapPin size={16} className="text-gray-400" />
          <span>{cleaner?.location?.address || 'Nearby'}</span>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Popular services</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {cleaner.services.slice(0,3).map((s) => (
              <div key={s.name} className="shrink-0 border rounded-full px-3 py-1 text-sm bg-gray-50">
                {s.name} · ${s.price}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onBook(cleaner)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
        >
          Book
        </button>
      </div>
    </div>
  )
}
