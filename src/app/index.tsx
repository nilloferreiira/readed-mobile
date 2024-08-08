import * as WebBrowser from "expo-web-browser"
import { useState } from "react"
import { UserDev } from "@/storage/const-user"
import { User, userServer } from "@/server/user-server"
import { user_dev } from "@/storage/const-user"
import { Text, View } from "react-native"
import { LogoImage } from "@/components/shared/logo-image"
import { LoginButton } from "@/components/login-page/login-button"

WebBrowser.maybeCompleteAuthSession()

export default function Home() {
  // loading
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // pensar onde colocar essa funcao
  async function handleLogin({ name, picture, sub }: UserDev) {
    // verficar se existe um user no storage antes da requisicao
    try {
      setIsLoading(true)

      const currentUser = await userServer.get({ name, picture, sub })

      setUser(currentUser)
      // criar funcao de salvar o token no storage
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
