import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import CleanerCard from './components/CleanerCard'
import BookingSheet from './components/BookingSheet'

function App() {
  const [coords, setCoords] = useState(null)
  const [cleaners, setCleaners] = useState([])
  const [loading, setLoading] = useState(true)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedCleaner, setSelectedCleaner] = useState(null)
  const [providerType, setProviderType] = useState('all')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    // Auto seed cleaners for first-run experience
    fetch(`${baseUrl}/seed`, { method: 'POST' }).finally(() => {
      fetchCleaners()
    })
  }, [])

  const locate = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      setCoords({ lat: latitude, lng: longitude })
      fetchCleaners(latitude, longitude, providerType)
    })
  }

  const fetchCleaners = async (lat, lng, provider = providerType) => {
    setLoading(true)
    try {
      const url = new URL(`${baseUrl}/cleaners`)
      if (lat && lng) {
        url.searchParams.set('lat', lat)
        url.searchParams.set('lng', lng)
      }
      if (provider && provider !== 'all') {
        url.searchParams.set('provider_type', provider)
      }
      url.searchParams.set('radius_km', 25)
      const res = await fetch(url.toString())
      const data = await res.json()
      setCleaners(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleBook = (cleaner) => {
    setSelectedCleaner(cleaner)
    setSheetOpen(true)
  }

  const handleConfirmBooking = async (payload) => {
    try {
      const res = await fetch(`${baseUrl}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      alert(`Booking created! Total: $${data.total_price}. Complete payment next.`)
      setSheetOpen(false)
    } catch (e) {
      alert('Failed to create booking')
    }
  }

  const onFilterChange = (type) => {
    setProviderType(type)
    fetchCleaners(coords?.lat, coords?.lng, type)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar onLocate={locate} providerType={providerType} onFilterChange={onFilterChange} />

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        <h1 className="text-2xl font-bold">Premium Car Cleaning near you</h1>
        {loading ? (
          <p className="text-gray-600">Loading cleaners...</p>
        ) : cleaners.length === 0 ? (
          <p className="text-gray-600">No cleaners found nearby.</p>
        ) : (
          <div className="grid gap-4">
            {cleaners.map((c) => (
              <CleanerCard key={c.id} cleaner={c} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>

      <BookingSheet
        open={sheetOpen}
        cleaner={selectedCleaner}
        onClose={() => setSheetOpen(false)}
        onConfirm={handleConfirmBooking}
      />
    </div>
  )
}

export default App
