"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "./LanguageContext";
import design_en from "@public/assets/text/en/design_en";
import design_fr from "@public/assets/text/fr/design_fr";
import Image from "next/image";

const imageLinks = [
	{ id: "building0", src: "/assets/img/building0.png" },
	{ id: "building1", src: "/assets/img/building1.png" },
	{ id: "building2", src: "/assets/img/building2.png" },
	{ id: "building3", src: "/assets/img/building3.png" },
	{ id: "building4", src: "/assets/img/building4.png" },
];

const contentMap = {
	building0: {
		images: ["/assets/img/0_(basement).png"],
	},
	building1: {
		images: ["/assets/img/1_1.png", "/assets/img/1_2.png"],
	},
	building2: {
		images: ["/assets/img/2_1.png", "/assets/img/2_2.png"],
	},
	building3: {
		images: ["/assets/img/3-13_1.png", "/assets/img/3-13_2.png"],
	},
	building4: {
		images: [
			"/assets/img/14_1.png",
			"/assets/img/14_2.png",
			"/assets/img/15_(roof).png",
		],
	},
};

const Design = () => {
	const { language } = useContext(LanguageContext);
	const texts = language === "fr" ? design_fr : design_en;
	const [activeBuilding, setActiveBuilding] = useState(null);
	const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);
	const originalThemeColorRef = useRef("");

	const images = activeBuilding ? contentMap[activeBuilding]?.images || [] : [];

	const setThemeColor = (color) => {
		let metaTag = document.querySelector('meta[name="theme-color"]');
		if (!metaTag) {
			metaTag = document.createElement("meta");
			metaTag.name = "theme-color";
			document.head.appendChild(metaTag);
		}
		if (!originalThemeColorRef.current) {
			originalThemeColorRef.current = metaTag.content;
		}
		metaTag.content = color;
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (fullscreenImageIndex !== null) {
				if (e.key === "ArrowRight") showNextImage();
				else if (e.key === "ArrowLeft") showPreviousImage();
				else if (e.key === "Escape") closeFullScreen();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [fullscreenImageIndex]);

	useEffect(() => {
		if (fullscreenImageIndex !== null) {
			setThemeColor("#000000");
		} else {
			setThemeColor(originalThemeColorRef.current || "#ffffff");
		}
	}, [fullscreenImageIndex]);

	const showNextImage = () => {
		setFullscreenImageIndex((prev) => (prev + 1) % images.length);
	};

	const showPreviousImage = () => {
		setFullscreenImageIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const closeFullScreen = () => setFullscreenImageIndex(null);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
			className="w-full max-w-6xl mx-auto mt-8 px-4"
		>
			<h2 className="text-3xl font-bold uppercase text-center mb-6 text-gray-800">
				{texts.title}
			</h2>

			<div className="border-2 border-gray-300 rounded-lg bg-white shadow-sm p-6">
				<div className="flex flex-col md:flex-row gap-6">
					{/* Left: clickable images */}
					<div className="flex flex-col gap-0 w-full md:w-1/2">
						{[...imageLinks].reverse().map(({ id, src }) => {
							const isActive = activeBuilding === id;

							return (
								<motion.div
									key={id}
									animate={{ scale: isActive ? 1.03 : 1 }}
									whileHover={!isActive ? { scale: 1.03 } : {}}
									whileTap={{ scale: 0.97 }}
									transition={{ duration: 0.2 }}
									onClick={() => setActiveBuilding(id)}
									className={`relative w-full overflow-hidden cursor-pointer ${
										isActive ? "z-30" : "hover:z-20"
									}`}
									style={{
										WebkitBackfaceVisibility: "hidden",
										transformStyle: "preserve-3d",
										willChange: "transform",
									}}
								>
									<div
										className="absolute inset-0 pointer-events-none z-10 transition-colors duration-300"
										style={{
											backgroundColor: isActive
												? "rgba(74, 222, 128, 0.2)"
												: "rgba(0, 0, 0, 0)",
										}}
									/>
									<img
										src={src}
										alt={id}
										className="w-full h-auto object-cover relative z-0"
										draggable={false}
									/>
								</motion.div>
							);
						})}
					</div>

					{/* Right: preview area */}
					<div className="w-full md:w-1/2 flex flex-col gap-4">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeBuilding || "default"}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.5 }}
								className="w-full"
							>
								{activeBuilding ? (
									<>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
											{images.map((imgSrc, i) => (
												<div
													key={i}
													className="w-full max-h-[300px] sm:max-h-[240px] overflow-hidden rounded cursor-pointer"
													onClick={() => setFullscreenImageIndex(i)}
												>
													<img
														src={imgSrc}
														alt={`detail ${i}`}
														className="object-contain w-full h-full mx-auto grayscale hover:grayscale-0 hover:brightness-95 transition duration-300"
														style={{ maxHeight: "100%", maxWidth: "100%" }}
														draggable={false}
													/>
												</div>
											))}
										</div>
										<p className="text-sm text-gray-600">
											{texts.descriptions[activeBuilding]}
										</p>
									</>
								) : (
									<p className="text-black text-sm">{texts.defaultText}</p>
								)}
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>

			{/* Fullscreen overlay */}
			{fullscreenImageIndex !== null && (
				<div
					className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
					onClick={closeFullScreen}
				>
					{/* Previous Arrow */}
					<button
						className="absolute left-4 text-gray-300 text-4xl z-50 hover:text-gray-100 transition"
						onClick={(e) => {
							e.stopPropagation();
							showPreviousImage();
						}}
						tabIndex="-1"
					>
						&#10094;
					</button>

					{/* Fullscreen Image */}
					<Image
						src={images[fullscreenImageIndex]}
						alt="Full Screen Image"
						width={1920}
						height={1080}
						style={{
							width: "auto",
							height: "80%",
							maxWidth: "95%",
							objectFit: "contain",
						}}
					/>

					{/* Next Arrow */}
					<button
						className="absolute right-4 text-gray-300 text-4xl z-50 hover:text-gray-100 transition"
						onClick={(e) => {
							e.stopPropagation();
							showNextImage();
						}}
						tabIndex="-1"
					>
						&#10095;
					</button>
				</div>
			)}
		</motion.div>
	);
};

export default Design;
