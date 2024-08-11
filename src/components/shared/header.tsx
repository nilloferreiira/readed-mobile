import { View } from "react-native"
import { LogoImage } from "./logo-image"
import { UserProfile } from "./user-profile"
import { UserProps } from "@/server/user-server"

interface HeaderProps {
  user: UserProps
}

export function Header({ user }: HeaderProps) {
  return (
    <View className="w-full p-4 mt-6 justify-between items-center flex-row">
      <LogoImage />
      <UserProfile source={user?.picture!} />
    </View>
  )
}
