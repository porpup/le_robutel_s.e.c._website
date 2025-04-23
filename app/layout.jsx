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
	title: "Le Robutel - Condos in Châteauguay",
	description: "Explore modern condos in Châteauguay with Le Robutel",
};

const siteUrl = "https://lerobutel.com";

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				{/* ===== CRITICAL FAVICON FIXES ===== */}
				{/* 1. ICO Fallback */}
				<link rel="icon" href={`${siteUrl}/favicon.ico?ver=3`} sizes="any" />

				{/* 2. Inline SVG Favicon (Works 100% in Safari) */}
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><rect width='16' height='16' fill='%23000'/></svg>"
					type="image/svg+xml"
				/>

				{/* 3. WebP Fallback */}
				<link
					rel="icon"
					href={`${siteUrl}/web-app-manifest-192x192.webp?ver=3`}
					type="image/webp"
					sizes="192x192"
				/>

				{/* 4. Apple Touch Icon (180x180 - Must Exist) */}
				<link
					rel="apple-touch-icon"
					href={`${siteUrl}/apple-touch-icon.png?ver=3`}
					sizes="180x180"
				/>

				{/* 5. Safari Pinned Tab */}
				<link
					rel="mask-icon"
					href={`${siteUrl}/safari-pinned-tab.svg?ver=3`}
					color="#000000"
				/>

				{/* ===== OPTIMIZATIONS ===== */}
				{/* Preload Critical Assets */}
				<link
					rel="preload"
					href={`${siteUrl}/apple-touch-icon.png`}
					as="image"
				/>
				<link rel="preload" href={`${siteUrl}/og-image.webp`} as="image" />
				<link
					rel="preload"
					href={`${siteUrl}/web-app-manifest-192x192.webp`}
					as="image"
				/>

				{/* PWA Manifest */}
				<link rel="manifest" href={`${siteUrl}/manifest.json?ver=3`} />

				{/* Windows Config */}
				<meta
					name="msapplication-config"
					content={`${siteUrl}/browserconfig.xml`}
				/>
				<meta name="msapplication-TileColor" content="#ffffff" />

				{/* Safari Meta Tags */}
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-title" content="Le Robutel" />

				{/* OpenGraph (Facebook, LinkedIn, etc.) */}
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
