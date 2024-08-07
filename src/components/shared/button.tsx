import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import { Loading } from "../shared/loading"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  isLoading?: boolean
  icon: keyof typeof Ionicons.glyphMap
}

function Button({ title, icon, isLoading, ...rest }: ButtonProps) {
  return <TouchableOpacity></TouchableOpacity>
}
