import { UserProps, userServer } from "@/server/user-server"
import { tokenCache } from "@/storage/token-cache"
import { createContext, useEffect, useState } from "react"

interface AuthContextProps {
  user: UserProps | null
  loading: boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({} as any)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  //Loading
  const [isGettingToken, setIsGettingToken] = useState(true)

  // Data
  const [user, setUser] = useState({} as UserProps)

  async function getUser() {
    try {
      const token = await tokenCache.getToken()

      if (!token) return

      const user = userServer.decodeJwt(token)

      setUser(user)
      setIsGettingToken(false)
    } catch (error) {
      console.log(error)
      setIsGettingToken(false)
    } finally {
      setIsGettingToken(false)
    }
  }

  async function logout() {
    await tokenCache.removeToken()
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading: isGettingToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
