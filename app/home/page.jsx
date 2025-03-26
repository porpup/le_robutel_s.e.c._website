"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Test from "@app/components/Test";
import Footer from "@app/components/Footer";

const Home = () => {
	return (
		<LanguageProvider>
			<Navbar />
			<Test />
			<Footer />
		</LanguageProvider>
	);
};

export default Home;
