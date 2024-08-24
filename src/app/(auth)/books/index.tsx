import { Header } from "@/components/shared/header"
import { AuthContext } from "@/contexts/auth-context"
import { router } from "expo-router"
import { useContext, useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"

export default function Home() {
  const { user, logout, isGettingToken } = useContext(AuthContext)

  // o user depois de sair e entrar no app volta como um {}

  return (
    <View className="w-full flex-1 gap-4 p-4 items-center">
      {/* header  */}
      <Header user={user!} />

      <Text className="font-bold text-2xl text-zinc-200">Suas leituras</Text>

      <TouchableOpacity
        onPressIn={() => logout()}
        className="bg-red-500 p-2 rounded-lg w-12"
      >
        <Text className="text-white">Sair</Text>
      </TouchableOpacity>
    </View>
  )
}
