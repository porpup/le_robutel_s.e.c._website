export function useSmoothScrollTo() {
	return (targetY, duration = 1000, onComplete) => {
		const scrollElement = document.scrollingElement || document.documentElement;
		const start = scrollElement.scrollTop;
		const distance = targetY - start;
		const startTime = performance.now();

		const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

		const animate = (currentTime) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			scrollElement.scrollTop = start + distance * easeOutCubic(progress);
			if (progress < 1) {
				requestAnimationFrame(animate);
			} else if (typeof onComplete === "function") {
				onComplete();
			}
		};

		requestAnimationFrame(animate);
	};
}
