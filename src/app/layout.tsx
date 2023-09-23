import { ReduxProvider } from "@/lib/reduxProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Tranquil mind",
	description: "Take care of  your mental health.",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
	return (
		<html lang="en">
			<body className={inter.className}>
        <ReduxProvider>
					<Navbar />
					{children}
				</ReduxProvider>
      </body>
		</html>
	);;
}
