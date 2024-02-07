'use client'

import { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useMediaQuery } from 'usehooks-ts'

import Link from 'next/link'
import Button from './button'
import Logo from './logo'
import { siteConfig } from '@/config/siteConfig'

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (!isMobile) setMobileNav(false)
  }, [isMobile])

  return (
    <nav className="fixed z-50 h-20 w-full bg-zinc-900">
      <div className="container mx-auto flex h-full justify-between px-10">
        <div className="flex items-center space-x-10 ">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden space-x-5 md:block">
            {siteConfig.navLinks.map((link, index) => (
              <Link key={index} href={link.href} target={link.target}>
                <Button variant="link" size="md">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <>
            {isMobile && (
              <button onClick={() => setMobileNav(!mobileNav)}>
                {mobileNav ? (
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-gray-500" />
                )}
              </button>
            )}
          </>
        </div>
      </div>

      {mobileNav && (
        <div className="absolute top-0 mt-20 flex w-full flex-col space-y-2 p-2 bg-zinc-900">
          {siteConfig.navLinks.map((link, index) => (
            <Link key={index} href={link.href} target={link.target}>
              <Button size="md" className="w-full dark:bg-white/5 dark:text-white">
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar