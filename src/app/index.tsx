import { api } from "@/server/api"
import { LoginButton } from "@/components/login-page/login-button"
import { LogoImage } from "@/components/shared/logo-image"
import { Text, View } from "react-native"
import { useEffect, useState } from "react"
import { user_dev } from "@/storage/const-user"
import { UserDev } from "@/storage/const-user"
import * as WebBrowser from "expo-web-browser"
import { jwtDecode } from "jwt-decode"

WebBrowser.maybeCompleteAuthSession()

interface ResponseData {
  data: {
    token: string
  }
}

interface User {
  name: string
  picture: string
  id: string
}

interface TokenProps {
  name: string
  picture: string
  sub: string
  iat: number
  exp: number
}

export default function Home() {
  // loading
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // pensar onde colocar essa funcao
  async function handleLogin({ name, picture, sub }: UserDev) {
    // verficar se existe um user no storage antes da requisicao
    try {
      setIsLoading(true)

      // criar hook pra isso
      const response = (await api.post("/register", {
        sub,
        name,
        picture,
      })) as ResponseData

      const responseToken = response.data.token

      const token = jwtDecode(responseToken) as TokenProps

      if (!token) {
        throw new Error("Token not found")
      }

      const currentUser: User = {
        name: token.name,
        picture: token.picture,
        id: token.sub,
      }

      setUser(currentUser)

      // set user no storage
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="w-full flex-1 items-center justify-center gap-2">
      <LogoImage />
      <Text className="text-white">Sua biblioteca pessoa online</Text>

      {user !== null && (
        <Text className="text-white">Bem vindo {user.name}</Text>
      )}
      <LoginButton
        onPress={() => handleLogin(user_dev)}
        isLoading={isLoading}
      />
    </View>
  )
}
