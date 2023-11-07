'use client'
import { useProfileQuery } from '@/redux/features/auth/authApi'

const Profile = () => {
  const { data } = useProfileQuery()
  return <div>{
  
   JSON.stringify(data)
  }</div>
}

export default Profile
