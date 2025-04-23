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

const siteUrl = "https://lerobutel.com";

// Optimized SVG icon as data URL
const svgIcon =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='black'/%3E%3C/svg%3E";

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				{/* Preload Critical Assets */}
				<link rel="preload" href={`${siteUrl}/og-image.webp`} as="image" />
				<link
					rel="preload"
					href={`${siteUrl}/web-app-manifest-192x192.webp`}
					as="image"
				/>

				{/* Favicon Standards */}
				<link rel="icon" href={`${siteUrl}/favicon.ico`} sizes="any" />
				<link rel="icon" href={svgIcon} type="image/svg+xml" />
				<link rel="mask-icon" href={svgIcon} color="#000000" />

				{/* Apple Touch Icon - Only the 180x180 you have */}
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href={`${siteUrl}/apple-touch-icon.png`}
				/>

				{/* PWA Manifest */}
				<link rel="manifest" href={`${siteUrl}/manifest.json`} />

				{/* Microsoft Tiles */}
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta
					name="msapplication-config"
					content={`${siteUrl}/browserconfig.xml`}
				/>

				{/* OpenGraph */}
				<meta property="og:title" content={metadata.title} />
				<meta property="og:description" content={metadata.description} />
				<meta property="og:image" content={`${siteUrl}/og-image.webp`} />
				<meta property="og:url" content={siteUrl} />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Le Robutel" />

				{/* Twitter Cards */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={metadata.title} />
				<meta name="twitter:description" content={metadata.description} />
				<meta name="twitter:image" content={`${siteUrl}/twitter-image.webp`} />
				<meta name="twitter:url" content={siteUrl} />

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
