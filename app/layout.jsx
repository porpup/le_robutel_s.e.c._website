import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "Le Robutel - Condos for Rent in Châteauguay",
	description: "Explore modern condos for rent in Châteauguay with Le Robutel",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				{/* Preload Critical Assets */}
				<link rel="preload" href="/icon0.svg" as="image" type="image/svg+xml" />
				<link rel="preload" href="/og-image.webp" as="image" />
				<link rel="preload" href="/web-app-manifest-192x192.webp" as="image" />

				{/* Favicon Standards */}
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/icon0.svg" type="image/svg+xml" />

				{/* Apple Touch Icons */}
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>

				{/* PWA Manifest */}
				<link rel="manifest" href="/manifest.json" />

				{/* Safari Pinned Tab */}
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />

				{/* Microsoft Tiles */}
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-config" content="/browserconfig.xml" />

				{/* OpenGraph */}
				<meta property="og:title" content={metadata.title} />
				<meta property="og:description" content={metadata.description} />
				<meta property="og:image" content="/og-image.webp" />
				<meta property="og:url" content="https://lerobutel.com" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Le Robutel" />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={metadata.title} />
				<meta name="twitter:description" content={metadata.description} />
				<meta name="twitter:image" content="/twitter-image.webp" />

				{/* Theme */}
				<meta name="theme-color" content="#ffffff" />
				<meta name="color-scheme" content="light only" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
			>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
