/** @format */

// src/app/page.tsx
"use client"; // Add this line to mark the component as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Change this import to next/navigation
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { auth } from "../../firebase";

const HomePage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push("/create"); // Redirect to a protected route after login
		} catch (error) {
			console.error("Error signing in:", error);
		}
	};

	return (
		<div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				<div className="bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-dark-100 mb-2">
							Bem-vindo!
						</h1>
						<p className="text-dark-400">
							Faça login para acessar sua conta
						</p>
					</div>
					
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
								Email
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Digite seu email"
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Digite sua senha"
								required
								className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
							/>
						</div>
						
						<button
							type="submit"
							className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Entrar
						</button>
					</form>
					
					<div className="mt-8 flex justify-between text-sm">
						<Link
							href="/signup"
							className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
						>
							Cadastrar e-mail
						</Link>
						<Link
							href="/forgotpassword"
							className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
						>
							Esqueceu a senha?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
