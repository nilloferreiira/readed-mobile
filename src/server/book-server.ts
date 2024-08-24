import { tokenCache } from "@/storage/token-cache"
import { api } from "./api"

export interface BookProps {
  id: string
  name: string
  author: string
  review: string
  rating: number
  date: Date
}

async function getAll() {
  try {
    const token = await tokenCache.getToken()

    const { data } = await api.get<{ books: BookProps[] }>("/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data.books
  } catch (error) {
    throw error
  }
}

export const bookServer = { getAll }
