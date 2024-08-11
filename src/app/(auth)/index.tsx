import { AuthContext } from "@/contexts/auth-context"
import { useContext } from "react"
import { View, Text, TouchableOpacity } from "react-native"

export default function Home() {
  const { user, logout } = useContext(AuthContext)

  // verificacao caso continue enviando para esta pagina msm q o user seja nulo

  return (
    <View className="w-full flex-1 items-center justify-center gap-5">
      <Text className="text-white">Autenticado como {user?.name}</Text>

      <TouchableOpacity
        onPressIn={() => logout()}
        className="bg-red-500 p-2 rounded-lg"
      >
        <Text className="text-white">Sair</Text>
      </TouchableOpacity>
    </View>
  )
}
