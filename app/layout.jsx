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
	description: "Explore modern condos in Châteauguay",
};

const siteUrl = "https://lerobutel.com";

export default function RootLayout({ children }) {
	const jsonLd = {
		"@context": "http://schema.org",
		"@type": "Organization",
		name: "Le Robutel",
		url: siteUrl,
		logo: `${siteUrl}/web-app-manifest-512x512.webp`,
	};

	return (
		<html lang="en" className="scroll-smooth">
			<head>
				{/* ===== CORE FAVICONS ===== */}
				{/* ICO Fallback */}
				<link rel="icon" href="/favicon.ico" sizes="any" />

				{/* Standard PNG Favicons */}
				<link
					rel="icon"
					type="image/png"
					sizes="48x48"
					href="/favicon-48x48.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>

				{/* SVG Favicon */}
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />

				{/* Modern WebP Favicons */}
				<link
					rel="icon"
					href="/web-app-manifest-192x192.webp"
					type="image/webp"
					sizes="192x192"
				/>

				{/* ===== APPLE/SAFARI SPECIFIC ===== */}
				{/* Apple Touch Icon */}
				<link
					rel="apple-touch-icon"
					href="/apple-touch-icon.png"
					sizes="180x180"
				/>

				{/* Safari Pinned Tab */}
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />

				{/* iOS Meta Tags */}
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-title" content="Le Robutel" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>

				{/* ===== PWA CONFIGURATION ===== */}
				<link rel="manifest" href="/manifest.json" />

				{/* ===== MICROSOFT/WINDOWS CONFIG ===== */}
				<meta name="msapplication-config" content="/browserconfig.xml" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-TileImage" content="/mstile-150x150.webp" />

				{/* ===== THEME & DISPLAY ===== */}
				<meta name="theme-color" content="#ffffff" />
				<meta name="color-scheme" content="light only" />

				{/* ===== OPENGRAPH & SOCIAL METADATA ===== */}
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

				{/* Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
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
