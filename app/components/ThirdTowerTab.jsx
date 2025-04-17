"use client";

import React from "react";
import Image from "next/image";

const ThirdTowerTab = () => {
	return (
		<div
			className="relative w-full"
			style={{
				aspectRatio: "16/9",
				minHeight: "300px",
				height: "clamp(300px, 50vh, 500px)",
			}}
		>
			<Image
				src="/assets/img/under_development.png"
				alt="Under Development"
				fill
				priority
				sizes="(max-width: 768px) 100vw, 80vw"
				className="object-contain"
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					objectFit: "contain",
				}}
			/>
		</div>
	);
};

export default ThirdTowerTab;
