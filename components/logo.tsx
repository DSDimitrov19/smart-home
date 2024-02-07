import Image from 'next/image'

const Logo = () => {
  return (
    <Image src="/logo.png" alt="Logo" width={130} height={0} priority unoptimized />
  )
}

export default Logo