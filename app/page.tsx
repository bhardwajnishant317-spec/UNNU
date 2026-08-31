'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import WelcomeGate from '@/components/welcome/WelcomeGate'
import Navigation from '@/components/navigation/Navigation'
import CinematicIntro from '@/components/intro/CinematicIntro'
import HeroSection from '@/components/hero/HeroSection'
import LoveLetter from '@/components/love-letter/LoveLetter'
import OurStory from '@/components/story/OurStory'
import ReasonsSection from '@/components/reasons/ReasonsSection'
import WhatYouAre from '@/components/typography/WhatYouAre'
import BirthdayWishes from '@/components/wishes/BirthdayWishes'
import Blessings from '@/components/blessings/Blessings'
import PhotoWall from '@/components/gallery/PhotoWall'
import LittleThings from '@/components/little-things/LittleThings'
import GiftSurprise from '@/components/surprise/GiftSurprise'
import HiddenMessage from '@/components/hidden/HiddenMessage'
import GrandFinale from '@/components/finale/GrandFinale'
import MusicPlayer from '@/components/music/MusicPlayer'
import GrainOverlay from '@/components/effects/GrainOverlay'
import { useEffect, useState } from 'react'

const CustomCursor = dynamic(() => import('@/components/cursor/CustomCursor'), { ssr: false })
const LenisProvider = dynamic(() => import('@/components/effects/LenisProvider'), { ssr: false })

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)

  return (
    <ThemeProvider>
      <GrainOverlay />
      <CustomCursor />
      <LenisProvider>
        <WelcomeGate onEnter={() => {}} />
        <Navigation />
        <MusicPlayer />
        <main>
          <CinematicIntro onComplete={() => setIntroComplete(true)} />
          <HeroSection />
          <LoveLetter />
          <OurStory />
          <ReasonsSection />
          <WhatYouAre />
          <BirthdayWishes />
          <Blessings />
          <PhotoWall />
          <LittleThings />
          <GiftSurprise onOpen={() => setGiftOpened(true)} />
          {giftOpened && <HiddenMessage />}
          <GrandFinale />
        </main>
      </LenisProvider>
    </ThemeProvider>
  )
}
