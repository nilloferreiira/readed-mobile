import axios from "axios"

const apiUrl = process.env.EXPO_PUBLIC_API_URL
// const apiUrl = process.env.EXPO_PUBLIC_LOCAL_API_URL

export const api = axios.create({ baseURL: apiUrl })
