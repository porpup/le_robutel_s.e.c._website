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
	themeColor: "#ffffff",
	appleWebApp: {
		title: "Le Robutel",
		capable: true,
		statusBarStyle: "default",
	},
	icons: [
		{ rel: "icon", href: "/favicon.ico" },
		{ rel: "shortcut icon", href: "/favicon.ico" },
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
		{ rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
		{ rel: "manifest", href: "/manifest.json" },
	],
	openGraph: {
		title: "Le Robutel - Condos for Rent in Châteauguay",
		description:
			"Explore modern condos for rent in Châteauguay with Le Robutel. Discover our latest construction projects and find your next home.",
		url: "https://lerobutel.com",
		siteName: "Le Robutel",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Le Robutel OG Image",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Le Robutel - Condos for Rent in Châteauguay",
		description:
			"Explore modern condos for rent in Châteauguay with Le Robutel.",
		images: ["/twitter-image.jpg"],
	},
	msapplication: {
		TileColor: "#ffffff",
		TileImage: "/web-app-manifest-192x192.png",
	},
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
