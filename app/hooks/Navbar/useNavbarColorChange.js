"use client";

import { useEffect } from "react";

export function useNavbarColorChange({
	scrollY,
	isHidden,
	scrollDirection,
	onColorChange,
	initialColor,
	delay = 500,
}) {
	useEffect(() => {
		let timeout;

		// 👇 Transparent only if at top
		if (scrollY <= 50) {
			onColorChange(initialColor);
		} else if (scrollDirection === "up") {
			onColorChange("black");
		}

		// 👇 Scroll up but not at top = immediately black
		else if (scrollDirection === "up") {
			onColorChange("black");
		}

		return () => clearTimeout(timeout);
	}, [scrollY, isHidden, scrollDirection, onColorChange, initialColor, delay]);
}
