import { UserDev } from "@/storage/const-user"
import { jwtDecode } from "jwt-decode"
import { api } from "./api"

interface ResponseData {
  data: {
    token: string
  }
}

interface TokenProps {
  name: string
  picture: string
  sub: string
  iat: number
  exp: number
}

export interface User {
  name: string
  picture: string
  id: string
}

async function get({ name, picture, sub }: UserDev) {
  const response = (await api.post("/register", {
    sub,
    name,
    picture,
  })) as ResponseData

  const token = response.data.token

  const decodedToken = jwtDecode(token) as TokenProps

  if (!decodedToken) {
    throw new Error("Token not found")
  }

  const currentUser: User = {
    name: decodedToken.name,
    picture: decodedToken.picture,
    id: decodedToken.sub,
  }

  return { user: currentUser, token }
}

export const userServer = { get }
