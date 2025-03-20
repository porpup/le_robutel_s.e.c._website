"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import Controls from "./Controls";
import Image from "next/image";
import { LanguageContext } from "./LanguageContext";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ scrolled, onColorChange, initialBgColor }) => {
	const [isScrolled, setIsScrolled] = useState(scrolled || false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isGalleryPage, setIsGalleryPage] = useState(false);
	const { language, toggleLanguage, translations } =
		useContext(LanguageContext);
	const navbarRef = useRef(null);
	const [offset, setOffset] = useState(0);
	const [scrollDirection, setScrollDirection] = useState("up");
	const [lastScrollY, setLastScrollY] = useState(0);
	const scrollThreshold = 50;

	const hasScrollbar = useRef(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsGalleryPage(window.location.pathname === "/gallery");
			hasScrollbar.current = window.innerHeight < document.body.offsetHeight;
		}
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsScrolled(currentScrollY > 10);

			if (
				!isMenuOpen &&
				Math.abs(currentScrollY - lastScrollY) > scrollThreshold
			) {
				setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
				setLastScrollY(currentScrollY);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY, isMenuOpen]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navbarRef.current && !navbarRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMenuOpen]);

	useEffect(() => {
		const bodyPaddingTop = parseInt(
			window.getComputedStyle(document.body).paddingTop,
			10
		);
		setOffset(-bodyPaddingTop);
	}, []);

	useEffect(() => {
		const color = isScrolled ? "#292524" : initialBgColor;
		onColorChange(color);
	}, [isScrolled, onColorChange, initialBgColor]);

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

	const linkClass = "font-bold text-lg text-white";

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
			ref={navbarRef}
			className={`fixed top-0 left-0 w-full z-10 transition-transform duration-200 px-4 ${
				isScrolled
					? "bg-black"
					: "bg-gradient-to-b from-black/60 via-black/30 to-transparent backdrop-blur-none "
			} ${
				scrollDirection === "down" && !isMenuOpen
					? "-translate-y-full"
					: "translate-y-0"
			}`}
		>
			<div className="mx-auto flex items-center justify-between p-2">
				<Link href="/">
					<motion.div
						variants={hoverScale}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
						className="cursor-pointer relative w-18 h-14"
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
						<motion.div
							key={language + "-home"}
							custom={0}
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
								<Link href="/" className={`cursor-pointer ${linkClass}`}>
									{translations.home}
								</Link>
							</motion.div>
						</motion.div>
						<motion.div
							key={language + "-gallery"}
							custom={1}
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
								<Link href="/gallery" className={`cursor-pointer ${linkClass}`}>
									{translations.gallery}
								</Link>
							</motion.div>
						</motion.div>
						<motion.div
							key={language + "-contact"}
							custom={2}
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
								<ScrollLink
									to="footer"
									smooth={true}
									duration={500}
									className={`cursor-pointer ${linkClass}`}
								>
									{translations.contacts}
								</ScrollLink>
							</motion.div>
						</motion.div>
					</AnimatePresence>
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
							width={38}
							height={38}
						/>
					</motion.button>
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
							<div className="relative w-18 h-14 transition-all duration-300">
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
							<ScrollLink
								to="footer"
								smooth={true}
								duration={500}
								offset={offset}
								className={`cursor-pointer ${linkClass}`}
								onClick={() => setIsMenuOpen(false)}
							>
								{translations.contacts}
							</ScrollLink>
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
							width={38}
							height={38}
						/>
					</motion.button>
				</motion.div>
			</div>
		</div>
	);
};

export default Navbar;
