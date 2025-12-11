const API_URL = import.meta.env.VITE_API_URL || ''
const APIM_SUBSCRIPTION_KEY = import.meta.env.VITE_APIM_SUBSCRIPTION_KEY || ''

export class ApiError extends Error {
  status: number
  details?: string

  constructor(status: number, message: string, details?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

interface FetchOptions extends RequestInit {
  token?: string
}

/**
 * Base fetch wrapper with error handling and auth
 */
export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Add APIM subscription key if configured
  if (APIM_SUBSCRIPTION_KEY) {
    headers['Ocp-Apim-Subscription-Key'] = APIM_SUBSCRIPTION_KEY
  }

  // Merge existing headers
  if (fetchOptions.headers) {
    const existingHeaders = fetchOptions.headers as Record<string, string>
    Object.assign(headers, existingHeaders)
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`
    let details: string | undefined

    try {
      const errorBody = await response.json()
      errorMessage = errorBody.message || errorMessage
      details = errorBody.error
    } catch {
      // Response wasn't JSON, use default message
    }

    throw new ApiError(response.status, errorMessage, details)
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

