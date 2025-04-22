"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
	"/assets/img/renders/building_day.png",
	"/assets/img/renders/building_up1.png",
	"/assets/img/renders/building_up2.png",
	"/assets/img/renders/boulevard.png",
];

const Welcome = () => {
	const [index, setIndex] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [showAnimation, setShowAnimation] = useState(false); // for fade-in effect

	// Preload all images
	useEffect(() => {
		let loadedImages = 0;
		images.forEach((src) => {
			const img = new Image();
			img.src = src;
			img.onload = () => {
				loadedImages++;
				if (loadedImages === images.length) {
					setLoaded(true);
				}
			};
		});
	}, []);

	// Start animation after loading
	useEffect(() => {
		if (!loaded) return;
		// Delay animation start slightly so static image blends in
		const timeout = setTimeout(() => {
			setShowAnimation(true);
			const interval = setInterval(() => {
				setIndex((prev) => (prev + 1) % images.length);
			}, 5000);
			return () => clearInterval(interval);
		}, 100); // small delay so transition feels smooth
		return () => clearTimeout(timeout);
	}, [loaded]);

	return (
		<div
			id="home"
			className="relative w-screen h-[35vh] md:h-[50vh] lg:h-[70vh] overflow-hidden"
		>
			{/* Static fallback image */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
				style={{ backgroundImage: `url(${images[0]})` }}
			/>

			{/* Animated background layer — fades in after preload */}
			{showAnimation && (
				<div className="absolute inset-0 z-10">
					{images.map((src, i) => (
						<motion.div
							key={src}
							initial={{ opacity: 0 }}
							animate={{ opacity: i === index ? 1 : 0 }}
							transition={{ duration: 2, ease: "easeInOut" }}
							className="absolute inset-0 pointer-events-none"
							style={{
								backgroundImage: `url(${src})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Welcome;
