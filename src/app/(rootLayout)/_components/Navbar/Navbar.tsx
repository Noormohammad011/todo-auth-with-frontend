'use client'

import {
  Moon,
  Sun,
  LogIn,
  LogOut,
  UserPlus2,
  UserCircle2,
  Key,
  User,
  Menu,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { removeUserInfo } from '@/services/auth.service'
import { authKey } from '@/constants/storageKey'
import { useAppSelector } from '@/redux/hooks'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Navbar = () => {
  const { setTheme } = useTheme()
  const { email } = useAppSelector((state) => state.auth)
  const handleLogout = () => {
    removeUserInfo(authKey)
    window.location.reload()
  }
  return (
    <nav className='flexBetween container padding-container relative z-30 py-5 bg-gray-200'>
      <Link href='/'>
        <Image
          src='https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_1280.png'
          alt='logo'
          width={50}
          height={50}
          className='cursor-pointer w-8 h-8'
        />
      </Link>
      <div className='hidden lg:flex justify-end items-center space-x-3'>
        {email ? (
          <>
            <Button variant='destructive' onClick={handleLogout} size='icon'>
              <LogOut className='h-4 w-4' />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                  <UserCircle2 className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href='/profile' className='flex'>
                    <User className='mr-2 h-4 w-4' />
                    <p>Profile</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href='/change-password' className='flex'>
                    <Key className='mr-2 h-4 w-4' />
                    <p>Change Password</p>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant='outline' size='icon'>
              <Link href='/login'>
                <LogIn className='h-4 w-4' />
              </Link>
            </Button>
            <Button variant='outline' size='icon'>
              <Link href='/register'>
                <UserPlus2 className='h-4 w-4' />
              </Link>
            </Button>
          </>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
              <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* MOBILE NAV */}
      <Sheet>
        <SheetTrigger className='flex md:hidden p-3'>
          <span className='text-2xl'>
            <Menu />
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className='h-screen flex flex-col justify-center items-center'>
              <div className='w-full space-y-3'>
                <div className='flex md:hidden justify-center items-center space-x-3'>
                  {email ? (
                    <>
                      <SheetClose asChild>
                        <Button
                          variant='destructive'
                          onClick={handleLogout}
                          size='icon'
                        >
                          <LogOut className='h-4 w-4' />
                        </Button>
                      </SheetClose>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button variant='outline' size='icon'>
                            <UserCircle2 className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56'>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <SheetClose asChild>
                              <Link href='/profile' className='flex'>
                                <User className='mr-2 h-4 w-4' />
                                <p>Profile</p>
                              </Link>
                            </SheetClose>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <SheetClose asChild>
                              <Link href='/change-password' className='flex'>
                                <Key className='mr-2 h-4 w-4' />
                                <p>Change Password</p>
                              </Link>
                            </SheetClose>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : (
                    <>
                      <Button variant='outline' size='icon'>
                        <Link href='/login'>
                          <SheetClose asChild>
                            <LogIn className='h-4 w-4' />
                          </SheetClose>
                        </Link>
                      </Button>

                      <Button variant='outline' size='icon'>
                        <Link href='/register'>
                          <SheetClose asChild>
                            <UserPlus2 className='h-4 w-4' />
                          </SheetClose>
                        </Link>
                      </Button>
                    </>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' size='icon'>
                        <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                        <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                        <span className='sr-only'>Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem onClick={() => setTheme('light')}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('dark')}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('system')}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false })
