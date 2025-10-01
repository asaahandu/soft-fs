
import { Suspense } from "react"
import "./globals.css"

export const metadata = {
  title: "Soft-fs - Solution Numerique",
  description: "Developper vos entreprises avec nos solutions numeriques",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
