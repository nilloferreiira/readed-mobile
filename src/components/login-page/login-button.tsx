import { Ionicons } from "@expo/vector-icons"
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native"
import { Loading } from "../shared/loading"

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

export function LoginButton({ isLoading, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
      disabled={isLoading}
      className="bg-zinc-700/15 min-w-64 max-w-64 min-h-11 max-h-11 flex-row items-center justify-center gap-2 rounded-lg px-2 border border-indigo/60 mt-4"
    >
      {isLoading ? (
        <View className="bg-zinc-700/15 min-w-64 max-w-64 min-h-11 max-h-11">
          <Loading />
        </View>
      ) : (
        <>
          <Ionicons name={"logo-google"} color={"#FFF"} />
          <Text className="text-zinc-50">Entrar com o google</Text>
        </>
      )}
    </TouchableOpacity>
  )
}
