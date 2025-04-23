"use client";

import React, { useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "./LanguageContext";
import firstTowerTab_en from "@public/assets/text/en/firstTowerTab_en";
import firstTowerTab_fr from "@public/assets/text/fr/firstTowerTab_fr";
import Image from "next/image";

const images = [
	{ src: "/assets/img/renders/building_day.webp", key: "day" },
	{ src: "/assets/img/renders/building_up_front.webp", key: "upFront" },
	{ src: "/assets/img/renders/building_front_2.webp", key: "front2" },
	{ src: "/assets/img/renders/building_behind.webp", key: "behind" },
	{ src: "/assets/img/boulevard.webp", key: "boulevard" },
];

const FirstTowerTab = () => {
	const { language } = useContext(LanguageContext);
	const content = language === "en" ? firstTowerTab_en : firstTowerTab_fr;

	const [fullscreenIndex, setFullscreenIndex] = useState(null);

	const openFullscreen = (index) => setFullscreenIndex(index);
	const closeFullscreen = () => setFullscreenIndex(null);

	const nextImage = useCallback(() => {
		setFullscreenIndex((prev) => (prev + 1) % images.length);
	}, []);

	const prevImage = useCallback(() => {
		setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length);
	}, []);

	useEffect(() => {
		const handleKey = (e) => {
			if (fullscreenIndex !== null) {
				if (e.key === "ArrowRight") nextImage();
				if (e.key === "ArrowLeft") prevImage();
				if (e.key === "Escape") closeFullscreen();
			}
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [fullscreenIndex, nextImage, prevImage]);

	useEffect(() => {
		if (fullscreenIndex !== null) {
			// Prevent scrolling behind the fullscreen viewer
			document.body.style.overflow = "hidden";
			document.body.style.touchAction = "none"; // prevent iOS from allowing gestures
		} else {
			// Restore scrolling
			document.body.style.overflow = "";
			document.body.style.touchAction = "";
		}

		return () => {
			// Restore on cleanup
			document.body.style.overflow = "";
			document.body.style.touchAction = "";
		};
	}, [fullscreenIndex]);

	return (
		<div className="p-6">
			<p className="mb-6">{content.description}</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{images.slice(0, 4).map((img, index) => (
					<motion.div
						key={img.key}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
						transition={{ duration: 0.3, delay: index * 0.1 }}
						className="relative h-64 w-full rounded-lg overflow-hidden cursor-pointer"
						onClick={() => openFullscreen(index)}
					>
						<Image
							src={img.src}
							alt={`Tower view ${index + 1}`}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</motion.div>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="mt-6 relative h-96 w-full rounded-lg overflow-hidden cursor-pointer"
				onClick={() => openFullscreen(4)}
			>
				<Image
					src={images[4].src}
					alt="Close-up front view"
					fill
					className="object-cover"
					sizes="100vw"
				/>
			</motion.div>

			<AnimatePresence>
				{fullscreenIndex !== null && (
					<motion.div
						className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center touch-none"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="relative w-[90vw] h-[80vh] max-w-6xl"
							onClick={closeFullscreen} // Now closes on any tap
							onPanEnd={(event, info) => {
								const swipe = info.offset.x;
								if (swipe < -100) {
									nextImage();
								} else if (swipe > 100) {
									prevImage();
								}
							}}
						>
							<Image
								src={images[fullscreenIndex].src}
								alt="Fullscreen image"
								fill
								className="object-contain"
								sizes="90vw"
							/>

							{/* Arrows */}
							<button
								onClick={(e) => {
									e.stopPropagation(); // Prevent this button from closing fullscreen
									prevImage();
								}}
								className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black/30 px-3 py-1 rounded-full"
							>
								‹
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation(); // Prevent this button from closing fullscreen
									nextImage();
								}}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black/30 px-3 py-1 rounded-full"
							>
								›
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FirstTowerTab;
