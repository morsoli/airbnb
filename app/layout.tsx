import ClientOnly from './components/ClientOnly'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'

const font = Nunito(
  {subsets: ['latin']}
)

export const metadata = {
  title: 'Aribnb',
  description: 'Aribnb next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly> 
          <Navbar />
        </ClientOnly>
        {children}</body>
    </html>
  )
}
