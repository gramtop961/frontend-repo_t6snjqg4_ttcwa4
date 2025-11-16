import { useMemo, useState } from 'react'
import { X, Calendar, CreditCard } from 'lucide-react'

export default function BookingSheet({ open, cleaner, onClose, onConfirm }) {
  const [service, setService] = useState(null)
  const [when, setWhen] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const total = useMemo(() => {
    const price = service ? Number(service.price || 0) : 0
    const callout = Number(cleaner?.base_callout_fee || 0)
    return price + callout
  }, [service, cleaner])

  if (!open || !cleaner) return null

  return (
    <div className="fixed inset-0 z-30 bg-black/40 flex items-end md:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">Book {cleaner.name}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Service</label>
            <select
              className="mt-1 w-full border rounded-xl px-3 py-2"
              value={service?.name || ''}
              onChange={(e)=>{
                const s = cleaner.services.find(x=>x.name===e.target.value)
                setService(s)
              }}
            >
              <option value="">Select service</option>
              {cleaner.services.map(s=> (
                <option key={s.name} value={s.name}>{s.name} - ${s.price}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">When</label>
            <div className="mt-1 flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <input type="datetime-local" value={when} onChange={e=>setWhen(e.target.value)} className="flex-1 border rounded-xl px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Address</label>
            <input value={address} onChange={e=>setAddress(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2" />
          </div>

          <div className="bg-gray-50 rounded-xl p-3 text-sm">
            <div className="flex justify-between">
              <span>Service</span>
              <span>${service?.price || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Callout</span>
              <span>${cleaner?.base_callout_fee || 0}</span>
            </div>
            <div className="flex justify-between font-semibold mt-1">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            disabled={!service || !when || !name || !phone}
            onClick={()=> onConfirm({
              cleaner_id: cleaner.id,
              service_name: service.name,
              scheduled_time: new Date(when).toISOString(),
              customer_name: name,
              customer_phone: phone,
              customer_email: email,
              address,
            })}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
          >
            <CreditCard size={18} />
            Continue to Pay
          </button>
        </div>
      </div>
    </div>
  )
}
