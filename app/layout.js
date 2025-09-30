
import { Suspense } from "react"
import "./globals.css"
import { AuthProvider } from "../contexts/AuthContext"

export const metadata = {
  title: "Soft-fs - Solution Numerique",
  description: "Developper vos entreprises avec nos solutions numeriques",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
