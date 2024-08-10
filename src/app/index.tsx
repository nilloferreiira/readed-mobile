import * as WebBrowser from "expo-web-browser"
import { useEffect, useState } from "react"
import { UserDev } from "@/storage/const-user"
import { UserProps, userServer } from "@/server/user-server"
import { user_dev } from "@/storage/const-user"
import { Alert, Text, View } from "react-native"
import { LogoImage } from "@/components/shared/logo-image"
import { LoginButton } from "@/components/login-page/login-button"
import { tokenCache } from "@/storage/token-cache"
import { router } from "expo-router"
import { Loading } from "@/components/shared/loading"

WebBrowser.maybeCompleteAuthSession()

export default function Home() {
  // loading
  const [isLoading, setIsLoading] = useState(false)
  const [isGettingToken, setIsGettingToken] = useState(true)

  // data
  const [user, setUser] = useState<UserProps | null>(null)

  async function saveUser(token: string) {
    try {
      await tokenCache.saveToken(token)
      router.navigate("(auth)")
    } catch (error) {
      Alert.alert(
        "Salvar usuário",
        "Não foi possível salvar o usuário no dispositivo"
      )
    }
  }

  async function isAuthenticated() {
    try {
      const token = await tokenCache.getToken()
      if (!token) {
        return setIsGettingToken(false)
      }

      return router.navigate("(auth)")
    } catch (error) {
      setIsGettingToken(false)
      console.log(error)
    }
  }

  // pensar onde colocar essa funcao
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

    return router.navigate("(auth)")
  }

  // melhorar o fluxo do useEffect() ele ta piscando a tela de login e depois mudando
  useEffect(() => {
    isAuthenticated()
  }, [])

  return (
    <View className="w-full flex-1 items-center justify-center gap-2">
      {isGettingToken ? (
        <Loading />
      ) : (
        <>
          <LogoImage />
          <Text className="text-white">Sua biblioteca pessoa online</Text>

          {user !== null && (
            <Text className="text-white">Bem vindo {user.name}</Text>
          )}
          <LoginButton
            onPress={() => handleLogin(user_dev)}
            isLoading={isLoading}
          />
        </>
      )}
    </View>
  )
}
