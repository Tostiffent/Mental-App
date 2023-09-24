import { ReduxProvider } from "@/lib/reduxProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: "/favicon.png",
  },
  title: "Moodscape",
  description: "Welcome to Moodscape, the website for all mental issues!",
  openGraph: {
    title: "Moodscape",
    description: "Welcome to Moodscape, the website for all mental issues!",
    url: "https://mental-app.vercel.app/",
    siteName: "Moodscape",
    images: [
      {
        url: "https://media.discordapp.net/attachments/1154724255859216435/1155276669880369232/image.png?width=781&height=473",
        width: 800,
        height: 600,
      },
      {
        url: "https://media.discordapp.net/attachments/1154724255859216435/1155276669880369232/image.png?width=781&height=473",
        width: 1800,
        height: 1600,
        alt: "pfp alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moodscape",
    description: "Welcome to Moodscape, the website for all mental issues!",
    siteId: "1467726470533754880",
    creator: "@moodscape",
    creatorId: "1467726470533754880",
    images: [
      "https://media.discordapp.net/attachments/1154724255859216435/1155276669880369232/image.png?width=781&height=473",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/favicon.ico" />
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
