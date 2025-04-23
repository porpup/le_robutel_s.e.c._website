import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Le Robutel - Condos for Rent in Châteauguay",
	description:
		"Explore modern condos for rent in Châteauguay with Le Robutel. Discover our latest construction projects and find your next home.",
	applicationName: "Le Robutel",
	metadataBase: new URL("https://lerobutel.com"), // Ensure this matches your production URL
	viewport: {
		themeColor: "#ffffff", // Moved themeColor here
	},
	appleWebApp: {
		title: "Le Robutel",
		capable: true,
		statusBarStyle: "default",
	},
	icons: [
		{ rel: "icon", href: "/favicon.ico" },
		{
			rel: "icon",
			type: "image/png",
			sizes: "192x192",
			href: "/web-app-manifest-192x192.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "512x512",
			href: "/web-app-manifest-512x512.png",
		},
		{ rel: "icon", type: "image/svg+xml", href: "/icon0.svg" },
		{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
		{ rel: "manifest", href: "/manifest.json" },
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
