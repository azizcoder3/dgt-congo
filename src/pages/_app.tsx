// src/pages/_app.tsx
import '@/styles/globals.css' // Le chemin est maintenant correct !
import type { AppProps } from 'next/app'
import ProgressBar from '@/components/ProgressBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ProgressBar />
    </>
  )
}