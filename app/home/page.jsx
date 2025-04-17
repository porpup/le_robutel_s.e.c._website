"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Welcome from "@app/components/Welcome";
import InTheArea from "@app/components/InTheArea";
import DiscoverOurTowers from "@app/components/DiscoverOurTowers";
import Footer from "@app/components/Footer";

const Home = () => {
	return (
		<LanguageProvider>
			<Navbar />
			<Welcome />
			<InTheArea />
			<DiscoverOurTowers />
			<Footer />
		</LanguageProvider>
	);
};

export default Home;
