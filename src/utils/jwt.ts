import { JwtPayload, jwtDecode } from 'jwt-decode'

export const decodedToken = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token)
  return decoded
}
