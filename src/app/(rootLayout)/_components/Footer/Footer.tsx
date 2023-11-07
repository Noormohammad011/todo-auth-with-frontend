import { Facebook, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-gray-200 mt-10'>
      <div className='container flex space-y-2 space-x-0 flex-col justify-center items-center min-h-[20vh] text-black my-auto'>
        <h1>
          Copyright &copy; Noor Mohammad <span> </span>
          {new Date().getFullYear().toLocaleString()}
        </h1>
        <div className='flex gap-2'>
          <Link target='_blank' href='https://www.facebook.com/noormohammad011'>
            <Facebook />
          </Link>
          <Link
            target='_blank'
            href='https://github.com/Noormohammad011?tab=repositories'
          >
            <Github />
          </Link>
          <Link
            target='_blank'
            href='https://www.linkedin.com/in/noor-mohammad-a39415218/'
          >
            <Linkedin />
          </Link>
        </div>
      </div>
    </footer>
  )
}
