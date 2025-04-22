"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
	"/assets/img/renders/building_day.webp",
	"/assets/img/renders/building_up1.png",
	"/assets/img/renders/building_up2.png",
	"/assets/img/renders/boulevard.png",
];

const Welcome = () => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % images.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			id="home"
			className="relative w-screen h-[35vh] md:h-[50vh] lg:h-[70vh] overflow-hidden"
		>
			{/* Background crossfade images */}
			{images.map((src, i) => (
				<motion.div
					key={src}
					initial={{ opacity: 0 }}
					animate={{ opacity: i === index ? 1 : 0 }}
					transition={{ duration: 2, ease: "easeInOut" }}
					className="absolute inset-0 z-0 pointer-events-none"
					style={{
						backgroundImage: `url(${src})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
			))}
		</div>
	);
};

export default Welcome;
