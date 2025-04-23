"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import about_en from "@public/assets/text/en/about_en";
import about_fr from "@public/assets/text/fr/about_fr";
import Image from "next/image";

const About = () => {
	const { language } = useContext(LanguageContext);
	const content = language === "fr" ? about_fr : about_en;

	// Refs for each section
	const heroRef = useRef(null);
	const davidRef = useRef(null);
	const philipRef = useRef(null);
	const honoringRef = useRef(null);
	const visionRef = useRef(null);
	const commitmentRef = useRef(null);
	const impactRef = useRef(null);

	// Animation states
	const [animateHero, setAnimateHero] = useState({
		title: false,
		text: false,
	});
	const [animateDavid, setAnimateDavid] = useState({
		title: false,
		image: false,
		content: false,
	});
	const [animatePhilip, setAnimatePhilip] = useState({
		title: false,
		image: false,
		text: false,
	});
	const [animateHonoring, setAnimateHonoring] = useState({
		title: false,
		image: false,
		text: false,
	});
	const [animateVision, setAnimateVision] = useState({
		title: false,
		image: false,
		text: false,
	});
	const [animateCommitment, setAnimateCommitment] = useState({
		title: false,
		text: false,
		items: false,
	});
	const [animateImpact, setAnimateImpact] = useState({
		title: false,
		text: false,
	});

	useEffect(() => {
		const handleScroll = () => {
			const checkVisibility = (ref, setState, keys) => {
				if (ref.current) {
					const rect = ref.current.getBoundingClientRect();
					if (rect.top < window.innerHeight * 0.8) {
						const newState = {};
						keys.forEach((key) => {
							newState[key] = true;
						});
						setState((prev) => ({ ...prev, ...newState }));
					}
				}
			};

			checkVisibility(heroRef, setAnimateHero, ["title", "text"]);
			checkVisibility(davidRef, setAnimateDavid, ["title", "image", "content"]);
			checkVisibility(philipRef, setAnimatePhilip, ["title", "image", "text"]);
			checkVisibility(honoringRef, setAnimateHonoring, [
				"title",
				"image",
				"text",
			]);
			checkVisibility(visionRef, setAnimateVision, ["title", "image", "text"]);
			checkVisibility(commitmentRef, setAnimateCommitment, [
				"title",
				"text",
				"items",
			]);
			checkVisibility(impactRef, setAnimateImpact, ["title", "text"]);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Check on initial load

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Helper function to determine if text is long
	const isLongText = (text) => {
		if (Array.isArray(text)) {
			return text.join("").length > 500;
		}
		return text.length > 500;
	};

	return (
		<div>
			<div ref={heroRef} className="bg-[#f8f5ef]">
				<section className="max-w-6xl mx-auto px-4 py-16">
					<div className="text-center py-14">
						<h2
							ref={heroRef}
							className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
								animateHero.title
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}
						>
							{content.sectionTitle}
						</h2>
						<p
							className={`text-xl max-w-3xl mx-auto transition-all duration-700 delay-200 ${
								animateHero.text
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}
						>
							{content.intro}
						</p>
					</div>
				</section>
			</div>

			{/* Rest of the sections */}
			<section className="max-w-6xl mx-auto px-4 py-16">
				{/* David Smith Section */}
				<div ref={davidRef} className="pl-8 pr-8 mb-16">
					<h3
						className={`text-3xl font-semibold mb-8 text-center transition-all duration-700 ${
							animateDavid.title
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						{content.davidSmithTitle}
					</h3>

					<div className="flex flex-col md:flex-row items-start gap-12">
						<div
							className={`w-full md:w-1/2 transition-all duration-700 ${
								animateDavid.image
									? "md:translate-x-0 translate-y-0 opacity-100"
									: "md:-translate-x-full translate-y-10 opacity-0"
							}`}
						>
							<Image
								src="/assets/img/david_smith.png"
								alt={content.davidSmithTitle}
								width={600}
								height={800}
								className="rounded-lg shadow-xl object-cover w-full h-auto"
							/>
						</div>

						<div
							className={`w-full md:w-1/2 transition-all duration-700 delay-200 ${
								animateDavid.content
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}
						>
							<h4 className="text-xl font-medium mb-4">
								{language === "fr"
									? "Ordres professionnels"
									: "Professional Orders"}
							</h4>
							<ul className="list-disc list-inside mb-6 space-y-2">
								{content.davidSmithProfessionalOrders.map((item, index) => (
									<li
										key={index}
										className={`transition-all duration-700 delay-${
											300 + index * 50
										} ${
											animateDavid.content
												? "translate-y-0 opacity-100"
												: "translate-y-5 opacity-0"
										}`}
									>
										{item}
									</li>
								))}
							</ul>

							<p
								className={`text-lg mb-6 transition-all duration-700 delay-500 ${
									animateDavid.content
										? "translate-y-0 opacity-100"
										: "translate-y-10 opacity-0"
								}`}
							>
								{content.davidSmithBio}
							</p>

							<div className="grid md:grid-cols-2 gap-6 mb-6">
								<div
									className={`transition-all duration-700 delay-600 ${
										animateDavid.content
											? "translate-y-0 opacity-100"
											: "translate-y-10 opacity-0"
									}`}
								>
									<h4 className="text-xl font-medium mb-3">
										{language === "fr"
											? "Projets en cours"
											: "Current Projects"}
									</h4>
									<ul className="space-y-2">
										{content.davidSmithCurrentProjects.map((item, index) => (
											<li
												key={index}
												className={`transition-all duration-700 delay-${
													700 + index * 50
												} ${
													animateDavid.content
														? "translate-y-0 opacity-100"
														: "translate-y-5 opacity-0"
												}`}
											>
												{item}
											</li>
										))}
									</ul>
								</div>
								<div
									className={`transition-all duration-700 delay-800 ${
										animateDavid.content
											? "translate-y-0 opacity-100"
											: "translate-y-10 opacity-0"
									}`}
								>
									<h4 className="text-xl font-medium mb-3">
										{language === "fr"
											? "Projets en conception"
											: "Design Phase"}
									</h4>
									<ul className="space-y-2">
										{content.davidSmithDesignProjects.map((item, index) => (
											<li
												key={index}
												className={`transition-all duration-700 delay-${
													900 + index * 50
												} ${
													animateDavid.content
														? "translate-y-0 opacity-100"
														: "translate-y-5 opacity-0"
												}`}
											>
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>

							<p
								className={`text-lg transition-all duration-700 delay-1000 ${
									animateDavid.content
										? "translate-y-0 opacity-100"
										: "translate-y-10 opacity-0"
								}`}
							>
								{content.davidSmithServices}
							</p>
						</div>
					</div>
				</div>

				{/* Philip Cortese Section */}
				<div ref={philipRef} className="pl-8 pr-8 mb-16">
					<h3
						className={`text-3xl font-semibold mb-8 text-center transition-all duration-700 ${
							animatePhilip.title
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						{content.philipCorteseTitle}
					</h3>

					<div
						className={`flex flex-col md:flex-row gap-12 ${
							isLongText(
								[
									content.philipCorteseBio1,
									content.philipCorteseBio2,
									content.philipCorteseBio3,
								].join("")
							)
								? "md:items-start"
								: "md:items-center"
						}`}
					>
						<div
							className={`w-full md:w-1/2 order-1 md:order-2 transition-all duration-700 ${
								animatePhilip.image
									? "md:translate-x-0 translate-y-0 opacity-100"
									: "md:translate-x-full translate-y-10 opacity-0"
							}`}
						>
							<Image
								src="/assets/img/philip_cortese.png"
								alt={content.philipCorteseTitle}
								width={600}
								height={800}
								className="rounded-lg shadow-xl object-cover w-full h-auto"
							/>
						</div>

						<div
							className={`w-full md:w-1/2 order-2 md:order-1 transition-all duration-700 delay-200 ${
								animatePhilip.text
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}
						>
							<p className="mb-6 text-lg">{content.philipCorteseBio1}</p>
							<p className="mb-6 text-lg">{content.philipCorteseBio2}</p>
							<p className="text-lg">{content.philipCorteseBio3}</p>
						</div>
					</div>
				</div>

				{/* Honoring Section */}
				<div ref={honoringRef} className="bg-[#f8f5ef] p-8 mb-16">
					<h3
						className={`text-3xl font-semibold mb-8 text-center transition-all duration-700 ${
							animateHonoring.title
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						{content.honoringTitle}
					</h3>

					<div
						className={`flex flex-col md:flex-row gap-12 ${
							isLongText(content.honoringText)
								? "md:items-start"
								: "md:items-center"
						}`}
					>
						<div
							className={`w-full md:w-1/2 transition-all duration-700 ${
								animateHonoring.image
									? "md:translate-x-0 translate-y-0 opacity-100"
									: "md:-translate-x-full translate-y-10 opacity-0"
							}`}
						>
							<Image
								src="/assets/img/heritage.png"
								alt={content.honoringTitle}
								width={600}
								height={600}
								className="rounded-lg shadow-xl object-cover w-full h-auto"
							/>
						</div>

						<div
							className={`w-full md:w-1/2 transition-all duration-700 delay-200 ${
								animateHonoring.text
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}
						>
							<p className="text-lg">{content.honoringText}</p>
						</div>
					</div>
				</div>

				{/* Vision Section */}
				<div ref={visionRef} className="pl-8 pr-8 mb-16">
					<h3
						className={`text-3xl font-semibold mb-8 text-center transition-all duration-700 ${
							animateVision.title
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						{content.visionTitle}
					</h3>

					<div
						className={`flex flex-col md:flex-row gap-12 ${
							isLongText(content.visionText)
								? "md:items-start"
								: "md:items-center"
						}`}
					>
						<div
							className={`w-full md:w-1/2 order-1 md:order-2 transition-all duration-700 ${
								animateVision.image
									? "md:translate-x-0 translate-y-0 opacity-100"
									: "md:translate-x-full translate-y-10 opacity-0"
							}`}
						>
							<Image
								src="/assets/img/vision.jpeg"
								alt={content.visionTitle}
								width={600}
								height={600}
								className="rounded-lg shadow-xl object-cover w-full h-auto"
							/>
						</div>

						<div
							className={`w-full md:w-1/2 order-2 md:order-1 transition-all duration-700 delay-200 ${
								animateVision.text
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}
						>
							<p className="text-lg">{content.visionText}</p>
						</div>
					</div>
				</div>

				{/* Commitment Section */}
				<div ref={commitmentRef} className="bg-[#f8f5ef] text-center p-8 mb-16">
					<h3
						className={`text-3xl font-semibold mb-8 transition-all duration-700 ${
							animateCommitment.title
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						{content.commitmentTitle}
					</h3>
					<p
						className={`text-xl max-w-3xl mx-auto mb-12 transition-all duration-700 delay-200 ${
							animateCommitment.text
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						{content.commitmentText}
					</p>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{content.commitmentPoints.map((point, index) => (
							<div
								key={index}
								className={`bg-white p-6 rounded-lg shadow-md transition-all duration-700 delay-${
									300 + index * 100
								} ${
									animateCommitment.items
										? "translate-y-0 opacity-100"
										: "translate-y-20 opacity-0"
								}`}
							>
								<div className="text-2xl font-bold text-amber-600 mb-3">
									{index + 1}
								</div>
								<p className="text-lg">{point}</p>
							</div>
						))}
					</div>
				</div>

				{/* Impact Section */}
				<div ref={impactRef} className="text-center pl-8 pr-8">
					<h3
						className={`text-3xl font-semibold mb-6 transition-all duration-700 ${
							animateImpact.title
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						{content.impactTitle}
					</h3>
					<p
						className={`text-xl max-w-3xl mx-auto transition-all duration-700 delay-200 ${
							animateImpact.text
								? "translate-y-0 opacity-100"
								: "translate-y-10 opacity-0"
						}`}
					>
						{content.impactText}
					</p>
				</div>
			</section>
		</div>
	);
};

export default About;
