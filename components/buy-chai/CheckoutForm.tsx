'use client'

import { useState } from 'react'
import { Turnstile, useTurnstile } from '@/components/ui/turnstile'
import { TierLabel, formatINR } from '@/data/chai-products'

interface CheckoutFormProps {
  selected: { slug: string; tier: TierLabel }[]
  orderTotal: number
}

type CustomerType = 'individual' | 'business'
type FieldErrors = Partial<Record<'name' | 'phone' | 'email' | 'address' | 'pincode', string>>
type BusinessType = 'hotel' | 'restaurant' | 'cafe' | 'office' | 'canteen' | 'other'

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'office', label: 'Office' },
  { value: 'canteen', label: 'Canteen' },
  { value: 'other', label: 'Other' },
]

function titleCase(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}

function validate(fields: {
  name: string
  phone: string
  email: string
  address: string
  pincode: string
}): FieldErrors {
  const e: FieldErrors = {}
  if (!fields.name.trim()) e.name = 'Name is required.'
  if (!fields.phone.trim()) e.phone = 'Phone number is required.'
  if (!fields.email.trim()) e.email = 'Email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    e.email = 'Enter a valid email address.'
  if (!fields.address.trim()) e.address = 'Delivery address is required.'
  else if (fields.address.trim().length < 7)
    e.address = 'Address must be at least 7 characters.'
  if (!fields.pincode.trim()) e.pincode = 'Pincode is required.'
  return e
}

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'

export default function CheckoutForm({ selected, orderTotal }: CheckoutFormProps) {
  const [customerType, setCustomerType] = useState<CustomerType>('individual')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [gstOrTaxId, setGstOrTaxId] = useState('')
  const [businessType, setBusinessType] = useState<BusinessType | ''>('')
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [triedSubmit, setTriedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const turnstile = useTurnstile()
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const touch = (field: string) => setTouched((prev) => new Set(prev).add(field))

  const errors = validate({ name, phone, email, address, pincode })
  const hasErrors = Object.keys(errors).length > 0

  const showError = (field: keyof FieldErrors) =>
    touched.has(field) || triedSubmit ? errors[field] : undefined

  const canSubmit = selected.length > 0 && (!siteKey || turnstile.isVerified) && !isSubmitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTriedSubmit(true)
    if (hasErrors) return
    setIsSubmitting(true)
    setApiError('')

    try {
      const res = await fetch('/api/create-chai-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          address,
          state,
          pincode,
          gstOrTaxId: gstOrTaxId || undefined,
          businessType: businessType || undefined,
          customerType,
          products: selected.map((s) => s.slug),
          tiers: selected.map((s) => ({ slug: s.slug, tier: s.tier })),
          totalAmount: orderTotal,
          turnstile_token: turnstile.token,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setApiError(data.error || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      localStorage.removeItem('bc_selected')
      window.location.href = data.paymentLink
    } catch {
      setApiError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Checkout</h2>

      {/* Customer Type */}
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Ordering as</p>
        <div className="flex gap-2">
          {(['individual', 'business'] as CustomerType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setCustomerType(type)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors active:scale-95 ${
                customerType === type
                  ? 'border-green-600 bg-green-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              touch('name')
              if (name.trim()) setName(titleCase(name.trim()))
            }}
            className={inputClass}
            placeholder="Your name"
          />
          {showError('name') && <p className="mt-1 text-sm text-red-600">{showError('name')}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => touch('phone')}
              className={inputClass}
              placeholder="+91 98765 43210"
            />
            {showError('phone') && (
              <p className="mt-1 text-sm text-red-600">{showError('phone')}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => touch('email')}
              className={inputClass}
              placeholder="you@example.com"
            />
            {showError('email') && (
              <p className="mt-1 text-sm text-red-600">{showError('email')}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Delivery Address *
          </label>
          <textarea
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => touch('address')}
            className={inputClass}
            placeholder="House/flat, street, locality..."
          />
          {showError('address') && (
            <p className="mt-1 text-sm text-red-600">{showError('address')}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* State */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              State
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={inputClass}
              placeholder="Maharashtra"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Pincode *
            </label>
            <input
              type="text"
              required
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              onBlur={() => touch('pincode')}
              className={inputClass}
              placeholder="400001"
            />
            {showError('pincode') && (
              <p className="mt-1 text-sm text-red-600">{showError('pincode')}</p>
            )}
          </div>
        </div>

        {/* Business-only fields */}
        {customerType === 'business' && (
          <>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                GST Number / Tax ID
              </label>
              <input
                type="text"
                value={gstOrTaxId}
                onChange={(e) => setGstOrTaxId(e.target.value)}
                className={inputClass}
                placeholder="27AABCU9603R1ZX"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Business Type
              </label>
              <div className="flex flex-wrap gap-2">
                {BUSINESS_TYPES.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setBusinessType((prev) => (prev === value ? '' : value))}
                    className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors active:scale-95 ${
                      businessType === value
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-green-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Turnstile */}
        <Turnstile
          onVerify={turnstile.handleVerify}
          onError={turnstile.handleError}
          onExpire={turnstile.handleExpire}
          className="flex justify-start"
        />

        {turnstile.error && (
          <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
            Verification failed. Please try again.
          </div>
        )}

        {triedSubmit && hasErrors && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            Please fix the errors above before continuing.
          </div>
        )}

        {apiError && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            {apiError}
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="mb-1 flex justify-between text-base font-bold text-gray-900 dark:text-gray-100">
            <span>Total</span>
            <span>{formatINR(orderTotal)}</span>
          </div>
          <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
            + GST as applicable · Secure payment via Cashfree
          </p>
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-lg bg-green-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-green-700 active:scale-95 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : `Pay ${formatINR(orderTotal)} →`}
          </button>
        </div>
      </form>
    </div>
  )
}
