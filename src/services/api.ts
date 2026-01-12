// Normalize API URL - remove trailing slash if present
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

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

interface FetchOptions extends Omit<RequestInit, 'credentials'> {
  // credentials is always 'include' to send cookies
}

/**
 * Base fetch wrapper with error handling
 * Cookies are automatically included for authentication
 */
export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Merge existing headers
  if (options.headers) {
    const existingHeaders = options.headers as Record<string, string>
    Object.assign(headers, existingHeaders)
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Always include cookies for auth
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
