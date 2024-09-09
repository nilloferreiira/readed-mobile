import { BookCard } from "@/components/books/book-card"
import { Header } from "@/components/shared/header"
import { Loading } from "@/components/shared/loading"
import { AuthContext } from "@/contexts/auth-context"
import { BookProps, bookServer } from "@/server/book-server"
import { useContext, useEffect, useState } from "react"
import { View, Text, FlatList } from "react-native"

type SectionData = {
  title: string
  data: BookProps[]
}

export default function Home() {
  //Loading
  const [isGettingBooks, setIsGettingBooks] = useState(true)

  // User context
  const { user } = useContext(AuthContext)

  // Books
  const [books, setBooks] = useState<BookProps[] | null>(null)

  async function getBooks() {
    try {
      const booksResponse = await bookServer.getAll()
      if (booksResponse) {
        setBooks(booksResponse)
      }

      setBooks(booksResponse)
    } catch (error) {
      console.log(error)
    } finally {
      setIsGettingBooks(false)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  return (
    <View className="w-full flex-1 gap-4 p-4 items-center">
      {/* header  */}
      <Header user={user!} />

      <Text className="font-bold text-2xl text-fontWhite">Suas leituras</Text>

      {/* trocar por Section List  */}
      {isGettingBooks ? (
        <Loading />
      ) : (
        <>
          {books ? (
            <FlatList
              data={books}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <BookCard book={item} />}
              ItemSeparatorComponent={() => <View className="h-4" />}
            />
          ) : (
            <Text>Nenhum livro encontrado!</Text>
          )}
        </>
      )}

      {/* end  */}
    </View>
  )
}
