'use client'

import { useState, useRef, useEffect } from 'react'
import { contactInfo } from '@/lib/cityData'

interface QuoteFormProps {
  defaultCity: string
  defaultState: string
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
        }
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

export default function QuoteForm({ defaultCity, defaultState }: QuoteFormProps) {
  const [quantity, setQuantity] = useState<number>(100)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [message, setMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileReady, setTurnstileReady] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    // If no siteKey, mark as ready immediately (no Turnstile required)
    if (!siteKey) {
      setTurnstileReady(true)
      return
    }

    if (!turnstileRef.current) return

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true

    script.onload = () => {
      if (window.turnstile && turnstileRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            setTurnstileToken(token)
            setTurnstileReady(true)
          },
          'error-callback': () => {
            console.error('Turnstile error - check your sitekey and domain settings')
            setTurnstileToken(null)
          },
          'expired-callback': () => {
            setTurnstileToken(null)
            setTurnstileReady(false)
          },
        })
      }
    }

    script.onerror = () => {
      console.error('Failed to load Turnstile script')
    }

    document.head.appendChild(script)

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
      script.remove()
    }
  }, [siteKey])

  const calculateFreight = () => {
    const baseRate = 40
    const gstRate = 0.05
    const subtotal = quantity * baseRate
    const gst = subtotal * gstRate
    const total = subtotal + gst
    return { subtotal, gst, total }
  }

  const { subtotal, gst, total } = calculateFreight()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || null,
          company_name: companyName || null,
          city: defaultCity,
          state: defaultState,
          quantity_kg: quantity,
          estimated_amount: total,
          message: message || null,
          source_page: typeof window !== 'undefined' ? window.location.pathname : null,
          turnstile_token: turnstileToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote')
      }

      setSubmitStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setCompanyName('')
      setMessage('')
      setQuantity(100)

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
        setTurnstileReady(false)
      }
      setTurnstileToken(null)
    } catch (err) {
      setSubmitStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const whatsappMessage = `Hi, I need a quote for ${quantity}kg of bulk CTC tea for ${defaultCity}, ${defaultState}. Expected amount: ₹${total.toLocaleString('en-IN')}`
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  if (submitStatus === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20">
        <div className="mb-2 text-2xl">✓</div>
        <h3 className="mb-2 text-lg font-semibold text-green-800 dark:text-green-200">
          Quote Request Submitted!
        </h3>
        <p className="mb-4 text-sm text-green-700 dark:text-green-300">
          We&apos;ve received your quote request. Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="text-sm font-medium text-green-600 underline hover:text-green-700 dark:text-green-400"
        >
          Submit another quote
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">Request a Quote</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Your company"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Quantity (kg) *
          </label>
          <input
            type="number"
            id="quantity"
            min={50}
            step={10}
            required
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Minimum order: {contactInfo.moq}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              City
            </label>
            <div className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {defaultCity}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              State
            </label>
            <div className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {defaultState}
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Base Price:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              ₹{subtotal.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">GST (5%):</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              ₹{gst.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="border-t border-gray-300 pt-2 dark:border-gray-600">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Estimated Total:
              </span>
              <span className="text-primary-600 dark:text-primary-400 text-lg font-bold">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Additional Message
          </label>
          <textarea
            id="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Any specific requirements or questions?"
          />
        </div>

        {siteKey && <div ref={turnstileRef} className="flex justify-center" />}

        {submitStatus === 'error' && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting || !turnstileReady}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 flex-1 rounded-md px-6 py-3 font-semibold text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex-1 rounded-md bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
          >
            Quick Quote on WhatsApp
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          *Prices are indicative. Final rates depend on quantity and delivery location.
        </p>
      </form>
    </div>
  )
}
