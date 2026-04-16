import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "午后酒馆 | After Work Wine Bar",
  description: "一个优雅的午后品酒体验空间，忘却白日的疲惫，沉浸在微醺的时光里。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="animated-gradient min-h-screen">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <footer className="mt-20 border-t border-text-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
