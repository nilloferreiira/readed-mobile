import { Header } from "@/components/shared/header"
import { Loading } from "@/components/shared/loading"
import { AuthContext } from "@/contexts/auth-context"
import { BookProps, bookServer } from "@/server/book-server"
import { router } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"

export default function Home() {
  //Loading
  const [isGettingBooks, setIsGettingBooks] = useState(true)

  // User context
  const { user, logout } = useContext(AuthContext)

  // Books
  const [books, setBooks] = useState<BookProps[] | null>(null)

  async function getBooks() {
    try {
      const booksResponse = await bookServer.getAll()
      if (booksResponse) {
        setBooks(booksResponse)
      }
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

      <Text className="font-bold text-2xl text-zinc-200">Suas leituras</Text>

      {/* trocar por Section List  */}
      {isGettingBooks ? (
        <Loading />
      ) : (
        <View>
          {books ? (
            <View>
              {books.map((book, i) => (
                <Text className="text-zinc-300">
                  {`${i + 1} - `}
                  <Text className="text-zinc-100 font-light">{book.name}</Text>
                </Text>
              ))}
            </View>
          ) : (
            <Text>Nenhum livro encontrado!</Text>
          )}
        </View>
      )}

      {/* end  */}

      <TouchableOpacity
        onPressIn={() => logout()}
        className="bg-red-500 p-2 rounded-lg w-12 top-3/4"
      >
        <Text className="text-white">Sair</Text>
      </TouchableOpacity>
    </View>
  )
}
