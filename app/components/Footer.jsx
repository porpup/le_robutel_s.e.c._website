"use client";

import React, { useRef, useContext } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "./LanguageContext";
import footer_en from "@public/assets/text/en/footer_en";
import footer_fr from "@public/assets/text/fr/footer_fr";

const Footer = () => {
	const company = {
		name: "Le Robutel S.E.C.",
		street: "266 rue St-Ignace",
		city: "La Prairie (Québec)",
		zip: "J5R 1E5",
		phoneNo: "+1 (450) 907-1992",
		email: "ds@dsarchitect.net",
	};

	const googleMap =
		"https://www.google.com/maps/place/266+Rue+Saint-Ignace,+La+Prairie,+QC+J5R+1E5/@45.419101,-73.4973428,16z/data=!4m15!1m8!3m7!1s0x4cc90e57a1edbe25:0xdea96ef162a63dee!2s266+Rue+Saint-Ignace,+La+Prairie,+QC+J5R+1E5!3b1!8m2!3d45.419101!4d-73.4973428!16s%2Fg%2F11b8v54ky6!3m5!1s0x4cc90e57a1edbe25:0xdea96ef162a63dee!8m2!3d45.419101!4d-73.4973428!16s%2Fg%2F11b8v54ky6?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D";

	const footerRef = useRef(null);
	const { language } = useContext(LanguageContext);
	const texts = language === "en" ? footer_en : footer_fr;

	const hoverScale = {
		initial: { scale: 1 },
		hover: { scale: 1.1, transition: { duration: 0.2 } },
		tap: { scale: 0.95 },
	};

	return (
		<footer
			ref={footerRef}
			id="footer"
			className="bg-black px-0 md:px-2 text-white"
		>
			{/* Title */}
			<h6 className="pl-8 pb-4 pt-6 font-light uppercase text-left text-3xl">
				Le Robutel S.E.C.
			</h6>

			{/* Contact Section */}
			<div className="pl-8">
				<AnimatePresence mode="wait">
					<motion.div
						key={language + "jobTitle"} // Unique key for animation
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
					>
						<div className="mb-1">{texts.jobTitle}:</div>
						<div className="mb-2">David Smith</div>
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="pl-8 pr-8 flex flex-wrap gap-x-10 gap-y-6 items-start mt-4 w-full max-w-full">
				{/* Phone */}
				<div className="flex flex-col items-start">
					<motion.div
						variants={hoverScale}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
						className="flex flex-col items-start"
					>
						<div className="mr-12 flex items-center">
							<svg
								className="mr-2 h-6 w-7"
								viewBox="0 0 32 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M10.7964 8.1207H19.2036V8.7279C19.2036 10.8195 20.9082 12.5259 23.001 12.5259H24.741L25.2852 20.7051C25.3776 22.1235 24.2868 23.2719 22.8822 23.2719H7.0032C5.5944 23.2719 4.5084 22.1085 4.6002 20.7039C4.782 17.9895 4.9152 15.2313 5.154 12.5265H6.9996C9.0918 12.5265 10.797 10.8207 10.797 8.7285V8.1207H10.7964ZM11.46 16.5807C11.46 14.6565 13.0188 13.0977 14.943 13.0977C16.8666 13.0977 18.4254 14.6571 18.4254 16.5807C18.4254 18.5055 16.8678 20.0631 14.943 20.0631C13.02 20.0637 11.46 18.5043 11.46 16.5807ZM14.943 12.0381C12.4344 12.0381 10.4004 14.0721 10.4004 16.5807C10.4004 19.0887 12.435 21.1233 14.943 21.1233C17.4486 21.1233 19.485 19.0869 19.485 16.5807C19.485 14.0727 17.451 12.0381 14.943 12.0381ZM9.0846 4.8363C8.22 4.8363 7.512 5.5443 7.512 6.4089V8.7285C7.512 9.0093 7.2804 9.2415 6.999 9.2415H1.5726C1.2906 9.2415 1.0596 9.0111 1.0596 8.7285V6.9285C1.0596 6.4797 1.1628 6.0945 1.3902 5.7069C1.896 4.8465 2.7294 4.1013 3.795 3.4749C9.279 0.2517 20.7192 0.2523 26.2044 3.4749C27.2706 4.1013 28.104 4.8465 28.6098 5.7069C28.8354 6.0921 28.9398 6.4815 28.9398 6.9285V8.7285C28.9398 9.0111 28.71 9.2415 28.4268 9.2415H23.0004C22.719 9.2415 22.4874 9.0093 22.4874 8.7285V6.4089C22.4874 5.5425 21.7806 4.8363 20.9148 4.8363H9.0846ZM8.571 6.4089C8.571 6.1263 8.8026 5.8965 9.0846 5.8965H20.9154C21.1968 5.8965 21.429 6.1275 21.429 6.4089V8.7285C21.429 9.5943 22.1352 10.3017 23.001 10.3017H28.4274C29.292 10.3017 30 9.5931 30 8.7285V6.9285C30 6.2835 29.8464 5.7291 29.5206 5.1729C28.9188 4.1493 27.9564 3.2799 26.7384 2.5641C20.9214 -0.8547 9.0798 -0.8547 3.2622 2.5641C2.0436 3.2799 1.0812 4.1487 0.48 5.1729C0.153 5.7291 0 6.2835 0 6.9279V8.7279C0 9.5925 0.7092 10.3011 1.5726 10.3011H6.999C7.8648 10.3011 8.571 9.5937 8.571 8.7279V6.4089ZM9.7368 7.5915V8.7285C9.7368 10.2387 8.5092 11.4669 6.999 11.4669H4.6686C4.3914 11.4669 4.164 11.6799 4.1412 11.9511C3.8892 14.8347 3.7386 17.7435 3.5448 20.6331C3.4116 22.6425 4.989 24.3315 7.0032 24.3315H22.8822C24.882 24.3315 26.475 22.6575 26.3406 20.6343L25.7622 11.9607C25.7436 11.6811 25.5102 11.4675 25.2342 11.4675L23.001 11.4663C21.4902 11.4663 20.2632 10.2375 20.2632 8.7279V7.5909C20.2632 7.2981 20.0262 7.0611 19.7334 7.0611H10.2666C9.9738 7.0611 9.7368 7.2987 9.7368 7.5915Z" />
							</svg>
							<Link href={`tel:${company.phoneNo}`}>{company.phoneNo}</Link>
						</div>
					</motion.div>
				</div>

				{/* Email */}
				<div className="mr-12 flex flex-col items-start">
					<motion.div
						variants={hoverScale}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
						className="flex items-center"
					>
						<svg
							className="mr-2 h-5 w-7"
							viewBox="0 1 33 16"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M2 0C0.903517 0 0 0.903517 0 2V16.6667C0 17.7631 0.903517 18.6667 2 18.6667H28C29.0965 18.6667 30 17.7631 30 16.6667V2C30 0.903517 29.0965 0 28 0H2ZM2.4375 1.33333H27.5625L15.6458 11.4896C15.3389 11.7512 14.6612 11.7512 14.3542 11.4896L2.4375 1.33333ZM1.33333 2.13542L10.1979 9.6979L1.33333 16.5729V2.13542ZM28.6667 2.13542V16.5729L19.8021 9.6979L28.6667 2.13542ZM11.2396 10.5833L13.4896 12.5C14.3543 13.2369 15.6457 13.2369 16.5104 12.5L18.7604 10.5833L27.4687 17.3333H2.53125L11.2396 10.5833Z" />
						</svg>
						<Link href={`mailto:${company.email}`}>{company.email}</Link>
					</motion.div>
				</div>

				{/* Address */}
				<div className="flex flex-col items-start">
					<div className="flex items-start">
						<motion.div
							variants={hoverScale}
							initial="initial"
							whileHover="hover"
							whileTap="tap"
							className="flex"
						>
							<svg
								className="mr-[-12px] h-8 w-12"
								viewBox="0 4 58 26"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M29.9821 6.49489C29.7931 6.35756 29.679 6.32046 29.4572 6.39228L20.298 9.41368L16.1952 8.03558L15.8172 9.41525L19.7644 10.7038V28.1462L9.89831 25.7069V22.1034H8.71438V25.7515L1.21616 28.2532V15.3945H0.0322266V29.2729C0.0322266 29.5077 0.130098 29.7279 0.321106 29.8645C0.445418 29.9541 0.585911 29.9999 0.735086 29.9999C0.814804 29.9999 0.890971 29.9868 0.967926 29.96L9.48433 27.029L20.1792 29.7887C20.3224 29.8254 20.4751 29.8171 20.6152 29.7654L29.8104 26.2235C30.0942 26.1177 30.0251 25.8466 30.0251 25.5431V7.08291C30.0251 6.85086 30.17 6.63144 29.9821 6.49489ZM28.8412 25.0388L20.9483 28.0361V10.7065L28.8412 8.08649V25.0388Z" />
								<path d="M6.57515 19.1142C6.6671 19.422 6.95006 19.6323 7.2713 19.6323C7.59215 19.6323 7.87511 19.422 7.96746 19.1142C8.67742 16.7514 10.0393 15.2447 11.3559 13.788C12.9944 11.9747 14.5422 10.2615 14.5422 7.2717C14.5422 3.39788 11.1451 0 7.2713 0C3.39827 0 0 3.39748 0 7.2717C0 10.2615 1.54819 11.9747 3.18674 13.788C4.50328 15.2447 5.86479 16.7514 6.57515 19.1142ZM7.2713 1.45426C10.316 1.45426 13.0883 4.22663 13.0883 7.2717C13.0883 9.70191 11.7852 11.1435 10.2769 12.8121C9.2461 13.9534 8.10992 15.2096 7.2713 16.9199C6.43229 15.2096 5.29651 13.953 4.2657 12.8121C2.75698 11.1432 1.45426 9.70191 1.45426 7.2717C1.45426 4.22663 4.22663 1.45426 7.2713 1.45426Z" />
								<path d="M7.26193 10.1616C8.8705 10.1616 10.1795 8.86084 10.1795 7.26175C10.1795 5.66305 8.87089 4.3623 7.26193 4.3623C5.65297 4.3623 4.34473 5.66305 4.34473 7.26175C4.34512 8.86084 5.65336 10.1616 7.26193 10.1616ZM7.26193 5.81657C8.06898 5.81657 8.72527 6.46536 8.72527 7.26175C8.72527 8.05932 8.06898 8.70733 7.26193 8.70733C6.45528 8.70733 5.79899 8.05893 5.79899 7.26175C5.79899 6.46536 6.45528 5.81657 7.26193 5.81657Z" />
							</svg>
							<Link
								href={googleMap}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col leading-tight"
							>
								<p>{company.street}</p>
								<p>{company.city}</p>
								<p>{company.zip}</p>
							</Link>
						</motion.div>
					</div>
				</div>
			</div>

			<hr className="h-[0.5px] mx-auto my-4 border-0 rounded bg_gray" />

			{/* Bottom text */}
			<div className="pl-8 text-xs pb-5 flex flex-col md:flex-row md:space-x-10">
				<AnimatePresence mode="wait">
					<motion.div
						key={language + "bottomText"} // Unique key for animation
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="flex items-center flex-wrap gap-x-1 mb-2 md:mb-0"
					>
						<span>© 2025 - {company.name} |&nbsp;</span>
						<motion.span
							variants={hoverScale}
							initial="initial"
							whileHover="hover"
							whileTap="tap"
							className="inline-block"
						>
							<Link
								href="/privacy"
								className="underline hover:text-gray-300 transition"
							>
								{texts.privacyPolicy}
							</Link>
						</motion.span>
					</motion.div>
				</AnimatePresence>
				<p>RBQ: 3379429999</p>
			</div>
		</footer>
	);
};

export default Footer;
