import Image from "next/image";
import Link from "next/link";

const NotFoundRoot = () => {
	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
			<Image
				src="/assets/img/404.jpg"
				alt="404 Not Found"
				fill
				className="absolute inset-0 object-cover"
				priority
			/>
			<div className="relative z-10">
				<Link
					href="/"
					className="inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-m font-medium text-white shadow hover:scale-110 transition-colors hover:bg-gray-900/85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
				>
					Go back Home
				</Link>
			</div>
		</div>
	);
};

export default NotFoundRoot;
