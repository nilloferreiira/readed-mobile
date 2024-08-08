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

  const responseToken = response.data.token

  const token = jwtDecode(responseToken) as TokenProps

  if (!token) {
    throw new Error("Token not found")
  }

  const currentUser: User = {
    name: token.name,
    picture: token.picture,
    id: token.sub,
  }

  return currentUser
}

export const userServer = { get }
