import { Image, View, Text } from "react-native"
import { Loading } from "./loading"

interface UserProfileProps {
  source: string
}

export function UserProfile({ source }: UserProfileProps) {
  return (
    <View className="max-w-11 min-w-11">
      {source ? (
        <Image
          source={{
            uri: source,
          }}
          resizeMode="contain"
          className="h-11 rounded-full"
        />
      ) : (
        <Loading />
      )}
    </View>
  )
}
