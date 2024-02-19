'use client'

import { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useMediaQuery } from 'usehooks-ts'

import Link from 'next/link'
import Button from './button'
import Logo from './logo'
import { siteConfig } from '@/config/siteConfig'
import { signOut } from 'next-auth/react'

const Navbar = ({ userId }: { userId: string | undefined }) => {
  const [mobileNav, setMobileNav] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [notificationsCount, setNotificationsCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/notification?receiverId=${userId}&count=true`);
      const newData = await response.json();
      setNotificationsCount(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 1000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if (!isMobile) setMobileNav(false)
  }, [isMobile])

  return (
    <nav className="z-50 h-20 w-full bg-zinc-900">
      <div className="container mx-auto flex h-full justify-between px-10">
        <div className="flex items-center space-x-10 ">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden space-x-5 md:block">
            {siteConfig.navLinks.map((link, index) => (
              <Link key={index} href={link.href} target={link.target}>
                <Button className='relative' variant="link" size="md">
                  {link.label}
                  {notificationsCount > 0 && link.label === 'Notifications' && (
                    <span className="absolute -top-1 -right-1 bg-green-500 rounded-full px-1.5 py-0.5 text-xs text-white">
                      {notificationsCount}
                    </span>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <>
            {isMobile ? (
              <button onClick={() => setMobileNav(!mobileNav)}>
                {mobileNav ? (
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-gray-500" />
                )}
              </button>
            ) : (
              <Button onClick={() => signOut()} size="md" className="dark:bg-red-500 dark:text-white">
                Logout
              </Button>
            )}
          </>
        </div>
      </div>

      {mobileNav && (
        <div className="absolute top-0 mt-20 flex w-full flex-col space-y-2 p-2 bg-zinc-900 z-50">
          {siteConfig.navLinks.map((link, index) => (
            <Link key={index} href={link.href} target={link.target}>
              <Button size="md" className="w-full dark:bg-white/5 dark:text-white">
                {link.label}
                {link.label === 'Notifications' && (
                  <span className="ml-1 mb-2 bg-green-500 rounded-full px-1.5 py-0.5 text-xs text-white">
                    {notificationsCount}
                  </span>
                )}
              </Button>
            </Link>
          ))}

          <Button onClick={() => signOut()} size="md" className="w-full dark:bg-red-500 dark:text-white">
            Logout
          </Button>
        </div>
      )}
    </nav>
  )
}

export default Navbar