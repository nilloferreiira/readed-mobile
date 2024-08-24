import { UserProps, userServer } from "@/server/user-server"
import { UserDev } from "@/storage/const-user"
import { tokenCache } from "@/storage/token-cache"
import { router } from "expo-router"
import { createContext, useEffect, useState } from "react"
import { Alert } from "react-native"

interface AuthContextProps {
  user: UserProps | null
  token: string | null
  isLoginLoading: boolean
  isGettingToken: boolean
  login: (user: UserDev) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({} as any)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  //Loading
  const [isGettingToken, setIsGettingToken] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Data
  const [user, setUser] = useState<UserProps | null>({} as UserProps)
  const [token, setToken] = useState<string | null>(null)

  async function getUser() {
    try {
      const tokenOnStorage = await tokenCache.getToken()

      if (!tokenOnStorage) return

      const user = userServer.decodeJwt(tokenOnStorage)

      setUser(user)
      setToken(tokenOnStorage)
      setIsGettingToken(false)
    } catch (error) {
      console.log(error)
      setIsGettingToken(false)
    } finally {
      setIsGettingToken(false)
    }
  }

  async function saveUser(token: string) {
    try {
      await tokenCache.saveToken(token)
      router.navigate("(auth)/books")
    } catch (error) {
      Alert.alert(
        "Salvar usuário",
        "Não foi possível salvar o usuário no dispositivo"
      )
    }
  }

  async function handleLogin({ name, picture, sub }: UserDev) {
    const token = await tokenCache.getToken()

    if (!token) {
      try {
        setIsLoading(true)

        const userData = await userServer.get({ name, picture, sub })

        setUser(userData.user)
        saveUser(userData.token)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    return router.navigate("(auth)/books")
  }

  async function logout() {
    await tokenCache.removeToken()
    setUser(null)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isGettingToken,
        isLoginLoading: isLoading,
        login: handleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
