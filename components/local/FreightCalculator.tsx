'use client'

import { useState } from 'react'
import { contactInfo } from '@/lib/cityData'

interface FreightCalculatorProps {
    defaultCity: string
    defaultState: string
}

export default function FreightCalculator({ defaultCity, defaultState }: FreightCalculatorProps) {
    const [quantity, setQuantity] = useState<number>(100)
    const [selectedCity, setSelectedCity] = useState(defaultCity)
    const [selectedState, setSelectedState] = useState(defaultState)

    // Simple freight calculation logic (you can customize this)
    const calculateFreight = () => {
        const baseRate = 40 // ₹40 per kg base rate
        const gstRate = 0.05 // 5% GST

        const subtotal = quantity * baseRate
        const gst = subtotal * gstRate
        const total = subtotal + gst

        return { subtotal, gst, total }
    }

    const { subtotal, gst, total } = calculateFreight()

    const handleGetQuote = () => {
        const message = `Hi, I need a quote for ${quantity}kg of bulk CTC tea for ${selectedCity}, ${selectedState}. Expected amount: ₹${total.toLocaleString('en-IN')}`
        const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                Calculate Freight & Pricing
            </h3>

            <div className="space-y-4">
                {/* Quantity Input */}
                <div>
                    <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Quantity (kg)
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        min={50}
                        step={10}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Minimum order: {contactInfo.moq}
                    </p>
                </div>

                {/* Location Info (Pre-filled) */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            City
                        </label>
                        <div className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            {selectedCity}
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            State
                        </label>
                        <div className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            {selectedState}
                        </div>
                    </div>
                </div>

                {/* Pricing Breakdown */}
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
                            <span className="font-semibold text-gray-900 dark:text-gray-100">Total:</span>
                            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                ₹{total.toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={handleGetQuote}
                    className="w-full rounded-md bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Get Quote on WhatsApp
                </button>

                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                    *Prices are indicative. Final rates depend on quantity and delivery location.
                </p>
            </div>
        </div>
    )
}
