import { ActivityIndicator } from "react-native"

export function Loading() {
  return (
    <ActivityIndicator className="flex-1 bg-transparent justify-center items-center text-indigo" />
  )
}
