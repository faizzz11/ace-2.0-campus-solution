import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Reinkei - Smart Campus Connection Platform",
  description: "Reinkei - AI-powered platform connecting students with clubs, project teams, and faculty initiatives. Features personalized recommendations, skill-based matching, event management, and collaborative tools for campus organizations.",
  keywords: "campus connection, student clubs, project teams, faculty initiatives, AI matching, skill-based recommendations, university platform, student engagement, campus organizations, academic collaboration",
  authors: [{ name: "Reinkei" }],
  openGraph: {
    title: "Reinkei - Smart Campus Connection Platform",
    description: "Connect with clubs, teams, and opportunities tailored to your skills and interests",
    type: "website",
    locale: "en_US",
    siteName: "Reinkei",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reinkei - Smart Campus Connection Platform",
    description: "AI-powered platform for students to discover and join campus organizations",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#e78a53",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="dark">{children}</body>
    </html>
  )
}
