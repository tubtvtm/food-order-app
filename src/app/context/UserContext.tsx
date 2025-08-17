'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  email: string
  // Add other user properties here
}

interface UserContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const updateUserFromStorage = () => {
      const stored = localStorage.getItem('user')
      if (stored) {
        try {
          setUser(JSON.parse(stored))
        } catch (e) {
          console.error('Failed to parse user from storage')
        }
      }
    }

    // Initial load
    updateUserFromStorage()

    // Listen for storage changes
    window.addEventListener('storage', updateUserFromStorage)
    
    return () => {
      window.removeEventListener('storage', updateUserFromStorage)
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}