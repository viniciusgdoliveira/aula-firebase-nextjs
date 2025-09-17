/** @format */
"use client"; // Ensure this file is treated as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Change the router import to next/navigation
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"; // Adjust the path based on your structure
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const { theme } = useTheme();

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(""); // Clear any previous errors

		try {
			await createUserWithEmailAndPassword(auth, email, password);
			// Redirect to the dashboard or homepage after successful signup
			router.push("/"); // Adjust this path based on your app structure
		} catch {
			// Handle signup error
			setError("Failed to create an account. Please check your email and password.");
		}
	};

	const getThemeClasses = () => {
		switch (theme) {
			case "light":
				return {
					container: "min-h-screen bg-light-50 flex items-center justify-center px-4",
					card: "bg-white rounded-xl shadow-light-xl p-8 border border-light-200",
					title: "text-3xl font-bold text-light-900 mb-2",
					subtitle: "text-light-600",
					label: "block text-sm font-medium text-light-700 mb-2",
					input: "w-full px-4 py-3 bg-light-100 border border-light-300 rounded-lg text-light-900 placeholder-light-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
					button: "w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
					link: "text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium",
					error: "bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg"
				};
			case "dark":
				return {
					container: "min-h-screen bg-dark-900 flex items-center justify-center px-4",
					card: "bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700",
					title: "text-3xl font-bold text-dark-100 mb-2",
					subtitle: "text-dark-400",
					label: "block text-sm font-medium text-dark-300 mb-2",
					input: "w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
					button: "w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
					link: "text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium",
					error: "bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg"
				};
			case "liquid-glass":
				return {
					container: "min-h-screen bg-gray-500 flex items-center justify-center px-4",
					card: "glass-card rounded-xl shadow-glass-xl p-8 border border-white/25 float",
					title: "text-3xl font-bold text-white mb-2",
					subtitle: "text-white/80",
					label: "block text-sm font-medium text-white/90 mb-2",
					input: "w-full px-4 py-3 glass-input rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
					button: "w-full glass-button hover:bg-white/25 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-glass-lg hover:shadow-glass-xl transform hover:-translate-y-0.5",
					link: "text-white/90 hover:text-white transition-colors duration-200 font-medium",
					error: "bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm"
				};
			default:
				return {
					container: "min-h-screen bg-dark-900 flex items-center justify-center px-4",
					card: "bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700",
					title: "text-3xl font-bold text-dark-100 mb-2",
					subtitle: "text-dark-400",
					label: "block text-sm font-medium text-dark-300 mb-2",
					input: "w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
					button: "w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
					link: "text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium",
					error: "bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg"
				};
		}
	};

	const themeClasses = getThemeClasses();

	return (
		<div className={themeClasses.container}>
			<div className="max-w-md w-full">
				<div className={themeClasses.card}>
					<div className="text-center mb-8">
						<h1 className={themeClasses.title}>
							Cadastrar
						</h1>
						<p className={themeClasses.subtitle}>
							Crie sua conta para começar
						</p>
					</div>
					
					<form onSubmit={handleSignup} className="space-y-6">
						<div>
							<label htmlFor="email" className={themeClasses.label}>
								Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="Digite seu email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className={themeClasses.input}
							/>
						</div>

						<div>
							<label htmlFor="password" className={themeClasses.label}>
								Senha
							</label>
							<input
								id="password"
								type="password"
								placeholder="Digite sua senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className={themeClasses.input}
							/>
						</div>

						{error && (
							<div className={themeClasses.error}>
								{error}
							</div>
						)}

						<button
							type="submit"
							className={themeClasses.button}
						>
							Cadastre-se
						</button>
						
						<div className="mt-6 text-center">
							<Link
								href="/"
								className={themeClasses.link}
							>
								Voltar para Login
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
