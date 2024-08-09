import * as SecureStore from "expo-secure-store"

const TOKEN_STORAGE_KEY = "readed_token"

async function getToken() {
  try {
    return SecureStore.getItem(TOKEN_STORAGE_KEY)
  } catch (error) {
    throw error
  }
}

async function saveToken(value: string) {
  try {
    return SecureStore.setItemAsync(TOKEN_STORAGE_KEY, value)
  } catch (error) {
    throw error
  }
}

async function removeToken() {
  try {
    return SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY)
  } catch (error) {
    throw error
  }
}

export const tokenCache = { getToken, saveToken, removeToken }
