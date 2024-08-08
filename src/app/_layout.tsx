import "@/styles/global.css"
import { Slot } from "expo-router"
import { StatusBar, View } from "react-native"
import {
  useFonts,
  Inter_600SemiBold,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter"
import { Loading } from "@/components/shared/loading"

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    //criar AuthProvider => funcao para verificar se tem um token no storage =>
    // mandar o index para pasta public e atraves da funcao getToken() determinar a rota do usuario
    <View className="flex-1 bg-zinc-950">
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <Slot />
    </View>
  )
}
