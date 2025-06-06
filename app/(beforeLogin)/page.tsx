'use client'

import darkLogo from '@/public/images/darkLogo.png'
import lightLogo from '@/public/images/lightLogo.png'
import KakaoLoginButton from '@/src/features/main/ui/KakaoLoginButton'
import { ThemeToggleButton } from '@/src/widgets/theme-toggle'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function BeforeLoginPage() {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>
      
      <div className="mb-12">
        <Image
          src={theme === 'dark' ? darkLogo : lightLogo}
          alt="로고"
          width={200}
          height={100}
        />
      </div>
      <KakaoLoginButton />
    </div>
  )
}