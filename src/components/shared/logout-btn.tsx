import { AuthContext } from "@/contexts/auth-context"
import { useContext } from "react"
import { TouchableOpacity, Text } from "react-native"

export function LogoutBtn() {
  const { logout } = useContext(AuthContext)
  return (
    <TouchableOpacity
      onPressIn={() => logout()}
      className="bg-red-500 p-2 rounded-lg"
    >
      <Text className="text-white">Sair</Text>
    </TouchableOpacity>
  )
}
