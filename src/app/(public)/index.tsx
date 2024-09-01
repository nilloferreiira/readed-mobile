import * as WebBrowser from "expo-web-browser"
import { useContext } from "react"
import { user_dev } from "@/storage/const-user"
import { Text, View } from "react-native"
import { LogoImage } from "@/components/shared/logo-image"
import { LoginButton } from "@/components/login-page/login-button"
import { AuthContext } from "@/contexts/auth-context"

WebBrowser.maybeCompleteAuthSession()

export default function Home() {
  const { user, isLoginLoading, login } = useContext(AuthContext)

  return (
    <View className="w-full flex-1 items-center justify-center gap-2">
      <LogoImage />
      <Text className="text-fontWhite">Sua biblioteca pessoa online</Text>

      {user !== null && (
        <Text className="text-fontWhite">Bem vindo {user.name}</Text>
      )}
      <LoginButton onPress={() => login(user_dev)} isLoading={isLoginLoading} />
    </View>
  )
}
