import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'

type User = {
  id: string
  username: string
  email?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setuser] = useState<User | null>(null)
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storeduser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (storeduser && token) {
      setuser(JSON.parse(storeduser))
      return
    }

    const sessionuser = sessionStorage.getItem('user')
    const sessiontoken = sessionStorage.getItem('token')

    if (sessionuser && sessiontoken) {
      setuser(JSON.parse(sessionuser))
    }
  }, [])

  const login = async (username: string, password: string, rememberme: boolean) => {
    setloading(true)
    seterror(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: username, pass: password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'login fail')
      }

      if (rememberme) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
      } else {
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('user', JSON.stringify(data.user))
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }

      setuser(data.user)
      setloading(false)
      router.push('/homepage')
    } catch (err) {
      seterror((err as Error).message)
      setloading(false)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    setloading(true)
    seterror(null)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: username, email, pass: password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'register fail')
      }

      setloading(false)
      router.push('/login')
    } catch (err) {
      seterror((err as Error).message)
      setloading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    setuser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
