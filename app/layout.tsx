import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0D0D0D",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://afterwork.wine"),
  title: {
    default: "午后酒馆 | After Work Wine Bar",
    template: "%s | 午后酒馆",
  },
  description: "忘却白日的疲惫，沉浸在微醺的时光里。一个优雅的午后品酒体验空间，精选世界各地优质葡萄酒。",
  keywords: ["酒馆", "品酒", "葡萄酒", "Wine Bar", "After Work", "微醺", "夜晚", "放松"],
  authors: [{ name: "AfterWork Team" }],
  creator: "AfterWork",
  publisher: "AfterWork Wine Bar",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://afterwork.wine",
    siteName: "午后酒馆",
    title: "午后酒馆 | After Work Wine Bar",
    description: "忘却白日的疲惫，沉浸在微醺的时光里",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "午后酒馆",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "午后酒馆 | After Work Wine Bar",
    description: "忘却白日的疲惫，沉浸在微醺的时光里",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// Loading Component with breathing animation
function LoadingDots() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D0D0D]">
      <div className="flex items-center gap-2">
        <span 
          className="w-2.5 h-2.5 rounded-full bg-[#8B2942] animate-breath"
          style={{ animationDelay: "0ms" }}
        />
        <span 
          className="w-2.5 h-2.5 rounded-full bg-[#A33D56] animate-breath"
          style={{ animationDelay: "200ms" }}
        />
        <span 
          className="w-2.5 h-2.5 rounded-full bg-[#D4A574] animate-breath"
          style={{ animationDelay: "400ms" }}
        />
      </div>
      <div className="absolute bottom-12 text-center">
        <p className="text-[#A0A0A0] text-sm font-light tracking-widest animate-pulse-subtle">
          正在开启微醺之旅...
        </p>
      </div>
    </div>
  );
}

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
      <body className="mood-gradient min-h-screen safe-area-top">
        <Header />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <footer className="mt-16 sm:mt-20 border-t border-[rgba(160,160,160,0.2)] safe-area-bottom">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center">
              <p className="text-[#A0A0A0] text-sm">
                🍷 午后酒馆 · After Work Wine Bar
              </p>
              <p className="text-[rgba(160,160,160,0.5)] text-xs mt-2">
                营业时间: 14:00 - 23:00 | 北京市朝阳区某街某号
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

export { LoadingDots };
