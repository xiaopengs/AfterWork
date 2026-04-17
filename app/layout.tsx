import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0D0D0D",
};

export const metadata: Metadata = {
  title: "午后酒馆 | After Work Wine Bar",
  description: "一个优雅的午后品酒体验空间，忘却白日的疲惫，沉浸在微醺的时光里。",
  keywords: ["酒馆", "品酒", "葡萄酒", "Wine Bar", "After Work"],
  authors: [{ name: "AfterWork" }],
  openGraph: {
    title: "午后酒馆",
    description: "忘却白日的疲惫，沉浸在微醺的时光里",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="animated-gradient min-h-screen safe-area-top">
        <Header />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <footer className="mt-16 sm:mt-20 border-t border-text-secondary/20 safe-area-bottom">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center">
              <p className="text-text-secondary text-sm">
                🍷 午后酒馆 · After Work Wine Bar
              </p>
              <p className="text-text-secondary/50 text-xs mt-2">
                营业时间: 14:00 - 23:00 | 北京市朝阳区某街某号
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
