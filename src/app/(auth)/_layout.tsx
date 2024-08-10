import "@/styles/global.css"
import { Slot } from "expo-router"

import { Loading } from "@/components/shared/loading"
import { View, StatusBar } from "react-native"
import { AuthProvider } from "@/contexts/auth-context"

export default function Layout() {
  return (
    // remover este layout e criar dentro do outro layout uma funcao pra gerenciar as rotas
    <View className="flex-1 bg-zinc-950">
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </View>
  )
}
