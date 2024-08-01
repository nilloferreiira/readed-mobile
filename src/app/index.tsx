import { LogoImage } from "@/components/shared/logo-image"
import { Text, View } from "react-native"

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center">
      <LogoImage />
      <Text className="text-white">Sua biblioteca pessoa online</Text>
    </View>
  )
}
