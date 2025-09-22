
import { Suspense } from "react"
import "./globals.css"

export const metadata = {
  title: "Eduka - Educational Platform",
  description: "Start Your Beautiful And Bright Future with Eduka",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
