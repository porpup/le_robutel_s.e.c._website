import React, { useState } from "react";

const Controls = ({ isMenuOpen, toggleMenu, isScrolled, isGalleryPage }) => {
	const [isPressed, setIsPressed] = useState(false);

	const handleMouseDown = () => {
		setIsPressed(true);
	};

	const handleMouseUp = (e) => {
		setIsPressed(false);
		e.target.blur(); // Remove focus from the button
	};

	const handleTouchStart = () => {
		setIsPressed(true);
	};

	const handleTouchEnd = (e) => {
		setIsPressed(false);
		e.target.blur(); // Remove focus from the button
	};

	const lineBaseClass = "block transition-all duration-300 ease-in-out";
	const colorClass =
		isScrolled || isGalleryPage
			? "bg_gray group-hover:bg-neutral-100"
			: "bg-neutral-100 group-hover:bg-stone-800";
	const pressedClass = isPressed ? "bg-neutral-100" : "";

	return (
		<button
			className="menuToggle group outline-none focus:outline-none flex flex-col justify-between items-center gap-2 w-10 h-10"
			onClick={toggleMenu}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<span
				className={`line1 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
			></span>
			<span
				className={`line2 ${isMenuOpen ? "scale-0" : "scale-100"}`}
			/>
			<span
				className={`line3 ${isMenuOpen ? "-translate-y-2 -rotate-45 w-10" : "w-10"}`}
			></span>
		</button>
	);
};

export default Controls;
