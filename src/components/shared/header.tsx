import { TouchableOpacity, View, Text } from "react-native"
import { LogoImage } from "./logo-image"
import { UserProfile } from "./user-profile"
import { UserProps } from "@/server/user-server"
import { useState } from "react"
import { LogoutBtn } from "./logout-btn"
import clsx from "clsx"

interface HeaderProps {
  user: UserProps
}

export function Header({ user }: HeaderProps) {
  const [showLogoutButton, setShowLogoutButton] = useState<boolean>(false)

  return (
    <View className="w-full p-4 mt-6 justify-between items-center flex-row">
      <LogoImage />
      <TouchableOpacity
        className={clsx("flex-row gap-4", {
          "bg-sky-800/20 p-2 rounded-lg": showLogoutButton,
        })}
        onPress={() => setShowLogoutButton(!showLogoutButton)}
      >
        <UserProfile source={user?.picture!} />
        {showLogoutButton && (
          <View className="flex-row items-center justify-center">
            <Text className="text-center text-zinc-200 font-semibold pr-2">
              {user.name}
            </Text>
            <LogoutBtn />
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}
