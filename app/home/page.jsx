"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Welcome from "@app/components/Welcome";
import InTheArea from "@app/components/InTheArea";
import DiscoverOurSpaces from "@app/components/DiscoverOurSpaces";
import Footer from "@app/components/Footer";

const Home = () => {
	return (
		<LanguageProvider>
			<Navbar />
			<Welcome />
			<InTheArea />
			<DiscoverOurSpaces />
			<Footer />
		</LanguageProvider>
	);
};

export default Home;
