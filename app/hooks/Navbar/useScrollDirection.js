import { useEffect, useState } from "react";

export function useScrollDirection({ threshold = 50, isMenuOpen }) {
	const [scrollDirection, setScrollDirection] = useState("up");
	const [lastScrollY, setLastScrollY] = useState(0);
	const [hidden, setHidden] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false); // 🔥 Needed

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (!isInitialized) {
				setIsInitialized(true); // first run
				setLastScrollY(currentScrollY);
				return;
			}

			if (!isMenuOpen && Math.abs(currentScrollY - lastScrollY) > threshold) {
				const direction = currentScrollY > lastScrollY ? "down" : "up";
				setScrollDirection(direction);
				setLastScrollY(currentScrollY);

				if (direction === "down") {
					setTimeout(() => setHidden(true), 200);
				} else {
					setHidden(false);
				}
			} else {
				setLastScrollY(currentScrollY);
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // run once to set initial state
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY, threshold, isMenuOpen, isInitialized]);

	return { scrollDirection, lastScrollY, hidden, setHidden, setLastScrollY, isInitialized };
}
