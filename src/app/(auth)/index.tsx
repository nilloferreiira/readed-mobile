import { Header } from "@/components/shared/header"
import { AuthContext } from "@/contexts/auth-context"
import { useContext } from "react"
import { View, Text, TouchableOpacity } from "react-native"

export default function Home() {
  const { user, logout } = useContext(AuthContext)

  // verificacao caso continue enviando para esta pagina msm q o user seja nulo

  return (
    <View className="w-full flex-1 gap-4 p-4 bg-bg items-center">
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
