import { Image } from "react-native"

export function LogoImage() {
  return (
    <Image
      source={require("@/assets/logo.png")}
      resizeMode="contain"
      className="h-8 -ml-4"
    />
  )
}
