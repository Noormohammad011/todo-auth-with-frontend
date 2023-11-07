'use client'
import { useGetProfileQuery } from '@/redux/features/auth/authApi'
import { TaskType } from '@/types'

const Profile = () => {
  const { data } = useGetProfileQuery()
  return (
    <div className='text-center my-5'>
      <h1 className='text-4xl font-bold'>Welcome {data?.name}</h1>
      <h2 className='text-2xl font-bold'>Email {data?.email}</h2>
      <h3 className='text-xl font-bold my-2'>Yout Completed Task</h3>
      {
        <div className='text-black justify-center items-center'>
          {data?.tasks.map((task: TaskType, index: string) => (
            <div
              key={index}
              className='flex justify-center items-center space-x-2'
            >
              <p className='text-xl font-bold'>{index + 1 } : </p>
              <p className='text-xl font-bold'>{task.description}</p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Profile
