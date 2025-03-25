"use client";

import React from "react";

const Controls = ({ isMenuOpen, toggleMenu }) => {
	return (
		<button
			className="menuToggle group outline-none focus:outline-none flex flex-col justify-between items-center gap-2 w-10 h-10"
			onClick={toggleMenu}
		>
			<span
				className={`line1 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
			></span>
			<span className={`line2 ${isMenuOpen ? "scale-0" : "scale-100"}`} />
			<span
				className={`line3 ${
					isMenuOpen ? "-translate-y-2 -rotate-45 w-10" : "w-10"
				}`}
			></span>
		</button>
	);
};

export default Controls;
