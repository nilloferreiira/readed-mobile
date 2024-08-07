export interface UserDev {
  name: string
  picture: string
  sub: string
}

const name = process.env.EXPO_PUBLIC_NAME!
const picture = process.env.EXPO_PUBLIC_PICTURE!
const sub = process.env.EXPO_PUBLIC_SUB!

export const user_dev = {
  name,
  picture,
  sub,
}
