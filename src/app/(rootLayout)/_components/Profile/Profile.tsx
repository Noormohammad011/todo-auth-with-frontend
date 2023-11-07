'use client'
import { useGetProfileQuery } from "@/redux/features/auth/authApi"


const Profile = () => {
  const { data } = useGetProfileQuery()
  return <div>{
  
   JSON.stringify(data)
  }</div>
}

export default Profile
