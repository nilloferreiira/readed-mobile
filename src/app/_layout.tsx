import "@/styles/global.css"
import { router, Slot } from "expo-router"
import { StatusBar, View } from "react-native"
import {
  useFonts,
  Inter_600SemiBold,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter"
import { Loading } from "@/components/shared/loading"
import { AuthContext, AuthProvider } from "@/contexts/auth-context"
import { useContext, useEffect } from "react"

function InitialLayout() {
  const { user, isGettingToken } = useContext(AuthContext)

  useEffect(() => {
    if (isGettingToken) return

    if (user !== null) {
      router.replace("(auth)/books")
    } else {
      router.replace("(public)")
    }
  }, [user, isGettingToken])

  return <>{isGettingToken ? <Loading /> : <Slot />}</>
}

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
    <View className="flex-1 bg-zinc-950">
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </View>
  )
}
