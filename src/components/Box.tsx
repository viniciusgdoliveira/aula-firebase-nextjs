/** @format */

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useUser } from "@/context/UserContext"; // Correctly import useUser
import { useTheme } from "@/context/ThemeContext";
import { auth } from "../../firebase"; // Ensure the path to firebase.ts is correct
import Link from "next/link"; // Import Link for navigation
import ThemeToggle from "./ThemeToggle";

type Props = {
	children: ReactNode;
};

const Box = ({ children }: Props) => {
	const router = useRouter();
	const { user } = useUser(); // Use the custom hook directly
	const { theme } = useTheme();

	const handleLogout = async () => {
		try {
			await signOut(auth); // Sign out the user
			router.push("/"); // Redirect to login page after logout
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const getThemeClasses = () => {
		switch (theme) {
			case "light":
				return {
					container: "min-h-screen bg-light-50",
					header: "bg-white border-b border-light-200 shadow-light-lg",
					title: "text-xl font-semibold text-light-900",
					link: "text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium",
					button: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
				};
			case "dark":
				return {
					container: "min-h-screen bg-dark-900",
					header: "bg-dark-800 border-b border-dark-700 shadow-dark-lg",
					title: "text-xl font-semibold text-dark-100",
					link: "text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium",
					button: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
				};
			case "liquid-glass":
				return {
					container: "min-h-screen",
					header: "glass-effect border-b border-white/12 shadow-glass-lg reflection",
					title: "text-xl font-semibold text-white",
					link: "text-white/90 hover:text-white transition-colors duration-200 font-medium",
					button: "glass-button hover:bg-white/15 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-glass-lg hover:shadow-glass-xl"
				};
			default:
				return {
					container: "min-h-screen bg-dark-900",
					header: "bg-dark-800 border-b border-dark-700 shadow-dark-lg",
					title: "text-xl font-semibold text-dark-100",
					link: "text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium",
					button: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
				};
		}
	};

	const themeClasses = getThemeClasses();

	return (
		<div className={themeClasses.container}>
			<header className={`${themeClasses.header} px-6 py-4`}>
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					<h1 className={themeClasses.title}>
						Olá, {user ? user.email : "Anônimo"}
					</h1>
					<div className="flex items-center space-x-6">
						<Link
							href="/create"
							className={themeClasses.link}
						>
							Adicionar
						</Link>
						<Link
							href="/read"
							className={themeClasses.link}
						>
							Função GET
						</Link>
						<Link
							href="/imagem"
							className={themeClasses.link}
						>
							Adicionar Imagem
						</Link>
						<Link
							href="/getimage"
							className={themeClasses.link}
						>
							Todas Imagens
						</Link>
						<ThemeToggle />
						<button
							onClick={handleLogout}
							className={themeClasses.button}
						>
							Logout
						</button>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-6 py-8">
				{children} {/* Render the child components (page content) */}
			</main>
		</div>
	);
};

export default Box;
