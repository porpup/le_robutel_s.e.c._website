"use client";

import React, { useState, useEffect } from "react";
import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import Test from "@app/components/Test";

const Home = () => {
	const [navbarColor, setNavbarColor] = useState("#7DD3FC");

	const handleColorChange = (color) => {
		setNavbarColor(color);
	};

	useEffect(() => {
		const updateThemeColor = () => {
			const currentScrollY = window.scrollY;
			const metaThemeColor = document.querySelector("meta[name=theme-color]");
			if (metaThemeColor) {
				if (currentScrollY === 0) {
					metaThemeColor.setAttribute("content", "#7DD3FC");
				} else {
					metaThemeColor.setAttribute("content", navbarColor);
				}
			}
		};

		updateThemeColor();
		window.addEventListener("scroll", updateThemeColor);

		return () => {
			window.removeEventListener("scroll", updateThemeColor);
		};
	}, [navbarColor]);

	const variants = {
		initial: { opacity: 0 },
		animate: { opacity: 1, transition: { duration: 0.5 } },
		exit: { opacity: 0, transition: { duration: 0.5 } },
	};

	return (
		<LanguageProvider>
			<Navbar onColorChange={handleColorChange} initialBgColor="bg-black" />
			<Test />
			<Footer />
		</LanguageProvider>
	);
};

export default Home;
