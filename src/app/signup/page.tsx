/** @format */
"use client"; // Ensure this file is treated as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Change the router import to next/navigation
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"; // Adjust the path based on your structure
import Link from "next/link";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

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

	return (
		<div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				<div className="bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-dark-100 mb-2">
							Cadastrar
						</h1>
						<p className="text-dark-400">
							Crie sua conta para começar
						</p>
					</div>
					
					<form onSubmit={handleSignup} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
								Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="Digite seu email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-dark-300 mb-2">
								Senha
							</label>
							<input
								id="password"
								type="password"
								placeholder="Digite sua senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
							/>
						</div>

						{error && (
							<div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
								{error}
							</div>
						)}

						<button
							type="submit"
							className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Cadastre-se
						</button>
						
						<div className="mt-6 text-center">
							<Link
								href="/"
								className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
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
