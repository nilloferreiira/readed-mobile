import { Loading } from "@/components/shared/loading"
import { AuthContext } from "@/contexts/auth-context"
import { router, Slot } from "expo-router"
import { useContext, useEffect } from "react"
import { View } from "react-native"

export default function HomeLayout() {
  const { user } = useContext(AuthContext)

  // verifica se um obejto esta vazio
  function isObjectEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0
  }

  useEffect(() => {
    if (user && isObjectEmpty(user)) {
      router.replace("(public)")
    }
  }, [user])

  return (
    <View className="flex-1 bg-bg">
      <Slot />
    </View>
  )
}
