"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import form_en from "@public/assets/text/en/form_en";
import form_fr from "@public/assets/text/fr/form_fr";

const Form = () => {
	const { language } = useContext(LanguageContext);
	const t = language === "fr" ? form_fr : form_en;
	const [submitted, setSubmitted] = useState(false);
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		try {
			await fetch("https://formsubmit.co/porpup@rambler.ru", {
				method: "POST",
				body: formData,
			});
			setSubmitted(true);
		} catch (error) {
			console.error("Form submission error:", error);
		}
	};

	useEffect(() => {
		if (submitted) {
			const timeout = setTimeout(() => {
				router.push("/");
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [submitted, router]);

	return (
		<div
			className="min-h-screen flex items-center pt-[80px] justify-center bg-cover bg-center px-4 py-10"
			style={{ backgroundImage: "url('/assets/img/postCard.jpg')" }}
		>
			<div className="w-full max-w-lg bg-white bg-opacity-90 p-8 rounded-xl shadow-md space-y-6 min-h-[500px] flex items-center justify-center">
				{!submitted ? (
					<form onSubmit={handleSubmit} className="w-full space-y-6">
						<input type="hidden" name="_captcha" value="false" />
						<input type="hidden" name="_next" value="false" />

						<div>
							<label className="block text-sm font-medium mb-1">
								{t.nameLabel}
							</label>
							<input
								type="text"
								name="name"
								required
								placeholder={t.namePlaceholder}
								className="w-full border border-gray-300 p-2 rounded-md placeholder-gray-400"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">
								{t.emailLabel}
							</label>
							<input
								type="email"
								name="email"
								required
								placeholder={t.emailPlaceholder}
								pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
								className="w-full border border-gray-300 p-2 rounded-md placeholder-gray-400"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">
								{t.phoneLabel}
							</label>
							<input
								type="tel"
								name="phone"
								required
								inputMode="numeric"
								pattern="[0-9]*"
								placeholder={t.phonePlaceholder}
								className="w-full border border-gray-300 p-2 rounded-md placeholder-gray-400"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">
								{t.messageLabel}
							</label>
							<textarea
								name="message"
								required
								rows="4"
								className="w-full border border-gray-300 p-2 rounded-md"
							></textarea>
						</div>

						<button
							type="submit"
							className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
						>
							{t.submitButton}
						</button>
					</form>
				) : (
					<div className="text-center">
						<Image
							src="/assets/img/checkMark.svg"
							alt="Success"
							width={80}
							height={80}
							className="mx-auto mb-4"
						/>
						<h2 className="text-3xl font-bold uppercase mb-2 text-black">
							{t.successTitle}
						</h2>
						<p className="text-l text-black">{t.successMessage}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Form;
