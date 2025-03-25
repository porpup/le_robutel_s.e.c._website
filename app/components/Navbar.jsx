"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import Controls from "./Controls";
import { LanguageContext } from "./LanguageContext";
import { useSmoothScrollTo } from "../hooks/Navbar/useSmoothScrollTo";
import { useNavbarColorChange } from "../hooks/Navbar/useNavbarColorChange";
import { useScrollDirection } from "../hooks/Navbar/useScrollDirection";

const Navbar = ({ initialBgColor }) => {
	const scrollTo = useSmoothScrollTo();
	const [navbarColor, setNavbarColor] = useState(
		initialBgColor || "transparent"
	);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isGalleryPage, setIsGalleryPage] = useState(false);
	const { language, toggleLanguage, translations } =
		useContext(LanguageContext);
	const hasScrollbar = useRef(false);
	const {
		scrollDirection,
		lastScrollY,
		hidden,
		setHidden,
		setLastScrollY,
		isInitialized,
	} = useScrollDirection({ threshold: 25, isMenuOpen });

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsGalleryPage(window.location.pathname === "/gallery");
			hasScrollbar.current = window.innerHeight < document.body.offsetHeight;
		}
	}, []);

	useNavbarColorChange({
		scrollDirection,
		isHidden: hidden,
		scrollY: lastScrollY,
		onColorChange: setNavbarColor,
		initialColor: initialBgColor,
		delay: 500,
	});

	useEffect(() => {
		const isTouchDevice =
			"ontouchstart" in window || navigator.maxTouchPoints > 0;

		if (isTouchDevice) {
			document.body.classList.add("no-hover");
		} else {
			document.body.classList.remove("no-hover");
		}
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const linkClass = "text-lg text-white";

	const handleHomeClick = (event) => {
		if (window.location.pathname === "/") {
			event.preventDefault();

			scrollTo(0, 1000, () => {
				setHidden(false);
				setLastScrollY(0);
				setNavbarColor(initialBgColor);
			});

			setTimeout(() => {
				const currentScrollY = window.scrollY;
				setLastScrollY(currentScrollY);
				if (currentScrollY <= 10) {
					setNavbarColor(initialBgColor);
				} else {
					setNavbarColor("black");
				}
			}, 1000);

			setIsMenuOpen(false);
		}
	};

	const handleGalleryClick = (event) => {
		if (window.location.pathname === "/gallery") {
			event.preventDefault();
			scrollTo(0);
			setIsMenuOpen(false);
		}
	};

	const textAnimation = {
		hidden: { y: 20, opacity: 0 },
		show: (i) => ({
			y: 0,
			opacity: 1,
			transition: { duration: 0.3, delay: i * 0.2 },
		}),
		exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
	};
	const navbarMobileVariants = {
		closed: {
			opacity: 0,
			y: -20,
			transition: { duration: 0.2 },
			pointerEvents: "none",
		},
		open: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, staggerChildren: 0.1 },
			pointerEvents: "auto",
		},
	};

	const hoverScale = {
		initial: { scale: 1 },
		hover: { scale: 1.1, transition: { duration: 0.2 } },
		tap: { scale: 0.95 },
	};

	return (
		<div
			className={`
				fixed top-0 left-0 w-full z-10 px-4 transition-all uppercase duration-500 ease-in-out
				${
					navbarColor === "black"
						? "bg-black"
						: "bg-gradient-to-b from-black/60 via-black/30 to-transparent backdrop-blur-none"
				}
				${
					isInitialized && hidden && !isMenuOpen
						? "-translate-y-full"
						: "translate-y-0"
				}
			`}
		>
			<div className="mx-auto flex items-center justify-between p-2">
				<Link href="/">
					<motion.div
						variants={hoverScale}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
						className="cursor-pointer relative w-20 h-14"
					>
						<Image
							src="/assets/img/logo.png"
							alt="logo"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							style={{ objectFit: "contain" }}
							className="transition-transform duration-200"
							priority
						/>
					</motion.div>
				</Link>
				<div className="md:hidden">
					<Controls isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
				</div>

				{/* Desktop Navbar */}
				<motion.nav className="hidden md:flex items-center space-x-4">
					<AnimatePresence mode="wait">
						{[
							{
								key: language + "-home",
								label: translations.home,
								href: "/",
								onClick: handleHomeClick,
							},
							{
								key: language + "-gallery",
								label: translations.gallery,
								href: "/gallery",
								onClick: handleGalleryClick,
							},
							{
								key: language + "-contactUs",
								label: translations.contacts,
								href: "/contactUs",
								onClick: () => setIsMenuOpen(false),
							},
						].map((item, i) => (
							<motion.div
								key={item.key}
								custom={i}
								initial="hidden"
								animate="show"
								exit="exit"
								variants={textAnimation}
							>
								<motion.div
									variants={hoverScale}
									initial="initial"
									whileHover="hover"
									whileTap="tap"
								>
									{item.isScrollLink ? (
										<ScrollLink
											to={item.href}
											smooth={true}
											duration={1000}
											className={`cursor-pointer ${linkClass}`}
											onClick={item.onClick}
										>
											{item.label}
										</ScrollLink>
									) : (
										<Link
											href={item.href}
											className={`cursor-pointer ${linkClass}`}
											onClick={item.onClick}
										>
											{item.label}
										</Link>
									)}
								</motion.div>
							</motion.div>
						))}

						{/* 🔥 Language toggle with same animation as menu items */}
						<motion.div
							key={language + "-lang-toggle"}
							custom={3}
							initial="hidden"
							animate="show"
							exit="exit"
							variants={textAnimation}
						>
							<motion.button
								onClick={toggleLanguage}
								variants={hoverScale}
								initial="initial"
								whileHover="hover"
								whileTap="tap"
								className="border border-current mx-2 my-1"
							>
								<Image
									src={
										language === "en"
											? "/assets/img/french.png"
											: "/assets/img/english.png"
									}
									alt={language === "en" ? "FR" : "EN"}
									width={28}
									height={28}
								/>
							</motion.button>
						</motion.div>
					</AnimatePresence>
				</motion.nav>
			</div>

			{/* Mobile Navbar */}
			<div
				className={`md:hidden fixed top-0 left-0 w-full bg-black flex flex-col justify-center items-center transition-[height,opacity] duration-500 ease-in-out ${
					isMenuOpen ? "h-screen opacity-100" : "h-0 opacity-0 overflow-hidden"
				}`}
			>
				{/* 🔥 Keep logo and hamburger menu always visible at the top */}
				<div className="absolute top-2 left-6 z-50">
					<Link href="/">
						<motion.div
							variants={hoverScale}
							initial="initial"
							whileHover="hover"
							whileTap="tap"
							className="cursor-pointer"
							onClick={() => setIsMenuOpen(false)}
						>
							<div className="relative w-20 h-14 transition-all duration-300">
								<Image
									src="/assets/img/logo.png"
									alt="logo"
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									style={{ objectFit: "contain" }}
									className="transition-transform duration-200"
									priority
								/>
							</div>
						</motion.div>
					</Link>
				</div>

				<div className="absolute top-4 right-6 z-50">
					<Controls isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
				</div>

				{/* Navigation Links - Roll Down Effect (wrapped in motion.div for fix) */}
				<motion.div
					initial="closed"
					animate={isMenuOpen ? "open" : "closed"}
					variants={navbarMobileVariants}
					className="flex flex-col items-center space-y-6 mt-20 w-full"
				>
					<motion.div
						variants={hoverScale}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
					>
						<Link href="/">
							<div
								className={`cursor-pointer ${linkClass}`}
								onClick={(e) => {
									toggleMenu();
									handleHomeClick(e);
								}}
							>
								{translations.home}
							</div>
						</Link>
					</motion.div>
					<motion.div
						variants={hoverScale}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
					>
						<Link href="/gallery">
							<div
								className={`cursor-pointer ${linkClass}`}
								onClick={(e) => {
									toggleMenu();
								}}
							>
								{translations.gallery}
							</div>
						</Link>
					</motion.div>
					<motion.div
						variants={hoverScale}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
					>
						{isGalleryPage && !hasScrollbar.current ? (
							<div
								className={`cursor-pointer ${linkClass}`}
								onClick={handleContactClick}
							>
								{translations.contacts}
							</div>
						) : (
							<Link href="/contactUs">
								<div
									className={`cursor-pointer ${linkClass}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{translations.contacts}
								</div>
							</Link>
						)}
					</motion.div>

					{/* 🔥 Language Toggle - Now together with other menu items */}
					<motion.button
						onClick={() => {
							toggleLanguage();
							toggleMenu();
						}}
						variants={hoverScale}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
						className="border border-current mx-2 my-1"
					>
						<Image
							src={
								language === "en"
									? "/assets/img/french.png"
									: "/assets/img/english.png"
							}
							alt={language === "en" ? "FR" : "EN"}
							width={28}
							height={28}
						/>
					</motion.button>
				</motion.div>
			</div>
		</div>
	);
};

export default Navbar;
