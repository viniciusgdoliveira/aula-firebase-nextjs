/** @format */

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useUser } from "@/context/UserContext"; // Correctly import useUser
import { auth } from "../../firebase"; // Ensure the path to firebase.ts is correct
import Link from "next/link"; // Import Link for navigation

type Props = {
	children: ReactNode;
};

const Box = ({ children }: Props) => {
	const router = useRouter();
	const { user } = useUser(); // Use the custom hook directly

	const handleLogout = async () => {
		try {
			await signOut(auth); // Sign out the user
			router.push("/"); // Redirect to login page after logout
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<div className="min-h-screen bg-dark-900">
			<header className="bg-dark-800 border-b border-dark-700 px-6 py-4 shadow-dark-lg">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					<h1 className="text-xl font-semibold text-dark-100">
						Olá, {user ? user.email : "Anônimo"}
					</h1>
					<div className="flex items-center space-x-6">
						<Link
							href="/create"
							className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
						>
							Adicionar
						</Link>
						<Link
							href="/read"
							className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
						>
							Função GET
						</Link>
						<Link
							href="/imagem"
							className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
						>
							Adicionar Imagem
						</Link>
						<Link
							href="/getimage"
							className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
						>
							Todas Imagens
						</Link>
						<button
							onClick={handleLogout}
							className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
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
