import { BookProps } from "@/server/book-server"
import { View, Text, TouchableOpacity } from "react-native"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookCardProps {
  book: BookProps
}

export function BookCard({ book }: BookCardProps) {
  return (
    <View className="bg-darkBlue opacity-80 w-80 max-w-80 max-h-48 gap-2 px-4 pt-2 pb-4 rounded-lg">
      <Text className="text-fontWhite/60 text-sm">
        Adicionado{" "}
        {formatDistanceToNow(book.date, { locale: ptBR, addSuffix: true })}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <Text className="text-fontWhite">{book.name}</Text>
          <Text className="text-startRating">{book.rating}</Text>
        </View>
        <Text className="text-sky-400">ED</Text>
      </View>

      <Text className="text-fontWhite/60">{book.review}</Text>
    </View>
  )
}
