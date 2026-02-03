'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

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

interface TurnstileState {
  token: string | null
  error: boolean
  isVerified: boolean
}

interface UseTurnstileReturn extends TurnstileState {
  handleVerify: (token: string) => void
  handleError: () => void
  handleExpire: () => void
  reset: () => void
}

/**
 * Hook for managing Turnstile verification state
 */
export function useTurnstile(): UseTurnstileReturn {
  const [state, setState] = useState<TurnstileState>({
    token: null,
    error: false,
    isVerified: false,
  })

  const handleVerify = useCallback((token: string) => {
    setState({
      token,
      error: false,
      isVerified: true,
    })
  }, [])

  const handleError = useCallback(() => {
    setState({
      token: null,
      error: true,
      isVerified: false,
    })
  }, [])

  const handleExpire = useCallback(() => {
    setState({
      token: null,
      error: false,
      isVerified: false,
    })
  }, [])

  const reset = useCallback(() => {
    setState({
      token: null,
      error: false,
      isVerified: false,
    })
  }, [])

  return {
    ...state,
    handleVerify,
    handleError,
    handleExpire,
    reset,
  }
}

interface TurnstileProps {
  siteKey?: string
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
  className?: string
}

/**
 * Turnstile widget component for bot protection
 * Dynamically loads the Cloudflare Turnstile script and manages widget lifecycle
 */
export function Turnstile({
  siteKey: propSiteKey,
  onVerify,
  onError,
  onExpire,
  className = '',
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const siteKey = propSiteKey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (!siteKey || !containerRef.current) return

    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    )

    const initWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          'error-callback': onError,
          'expired-callback': onExpire,
        })
        setIsLoaded(true)
      }
    }

    if (existingScript && window.turnstile) {
      initWidget()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true

    script.onload = initWidget

    script.onerror = () => {
      console.error('Failed to load Turnstile script')
      onError?.()
    }

    document.head.appendChild(script)

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [siteKey, onVerify, onError, onExpire])

  // Don't render anything if no siteKey
  if (!siteKey) return null

  return <div ref={containerRef} className={className} data-loaded={isLoaded} />
}

/**
 * Reset the Turnstile widget
 * Call this after form submission to allow re-verification
 */
export function resetTurnstileWidget(widgetId: string | null) {
  if (widgetId && window.turnstile) {
    window.turnstile.reset(widgetId)
  }
}
