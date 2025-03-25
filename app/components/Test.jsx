"use client";

import React from "react";
import Image from "next/image";

const Test = () => {
	return (
		<div>
			<Image
				src="/assets/img/LRS.jpg"
				alt="logo"
				width={5000} // Set your desired width
				height={3000} // Set your desired height
				style={{ objectFit: "contain" }}
				className="transition-transform"
				priority
			/>
			<Image
				src="/assets/img/LRS.jpg"
				alt="logo"
				width={5000} // Set your desired width
				height={3000} // Set your desired height
				style={{ objectFit: "contain" }}
				className="transition-transform"
				priority
			/>
		</div>
	);
};

export default Test;
