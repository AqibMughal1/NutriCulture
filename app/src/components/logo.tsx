import { Squircle } from 'lucide-react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
      <Image
        src="/OptimalCloudlogo.png"
        alt="NutriCulture Logo"
        width={48} // equivalent to w-12 (12 * 4 = 48px)
        height={48} // equivalent to h-12 (12 * 4 = 48px)
        className="group-hover:-rotate-12 transition-all duration-300"
      />

      <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-indigo-600 group-hover:translate-x-1 group-hover:scale-105 transition-all duration-300 tracking-wide drop-shadow-lg">
        NUTRICULTURE
      </span>
    </div>
  )
}
