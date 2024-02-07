import Image from 'next/image'
import Link from 'next/link'
import Button from './button'
import { siteConfig } from '@/config/siteConfig'

import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center">
      <Image
        src={siteConfig.background}
        alt="backgorund"
        fill
        priority
        unoptimized
        className="-z-10 object-cover opacity-35"
      />
      <div className="absolute -z-10 size-full bg-gradient-to-t from-zinc-800" />

      <motion.div
      className="flex max-w-7xl flex-col items-center space-y-10 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-8xl font-bold max-lg:text-7xl max-md:text-6xl max-sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {siteConfig.name}
      </motion.h1>

      <motion.p
        className="max-w-3xl text-pretty max-lg:max-w-lg max-lg:text-md max-md:max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Experience effortless living with our cutting-edge technology. Control
        your lights, thermostat, security, and more, all from one place.
        Simplify your life and embrace the future of home automation. Start
        your journey to a smarter home today.
      </motion.p>

      <motion.div
        className="space-x-5 flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {siteConfig.buttonLinks.map((link, index) => (
          <Link key={index} href={link.href} target={link.target}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant={link.variant} size={"lg"}>
                {link.label}
              </Button>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.div>
    </section>
  )
}

export default Hero