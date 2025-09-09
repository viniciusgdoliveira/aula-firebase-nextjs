/** @format */
"use client"; // Ensure this file is treated as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase"; // Adjust the path based on your structure
import Link from "next/link";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const router = useRouter(); // Use useRouter from next/navigation

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(""); // Clear any previous errors
		setMessage(""); // Clear any previous messages

		try {
			await sendPasswordResetEmail(auth, email);
			setMessage("Verifique seu e-mail.");
			setEmail(""); // Clear email input after sending the reset email
			router.push("/"); // Redirect to the login page
		} catch {
			setError("Failed to send password reset email. Please check your email address.");
		}
	};

	return (
		<div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				<div className="bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-dark-100 mb-2">
							Esqueceu a senha?
						</h1>
						<p className="text-dark-400">
							Digite seu email para receber o link de redefinição
						</p>
					</div>
					
					<form onSubmit={handleResetPassword} className="space-y-6">
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

						{error && (
							<div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
								{error}
							</div>
						)}
						
						{message && (
							<div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg">
								{message}
							</div>
						)}

						<button
							type="submit"
							className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Enviar e-mail para resetar
						</button>
					</form>
					
					<div className="mt-8 flex justify-between text-sm">
						<Link
							href="/"
							className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
						>
							Voltar para Login
						</Link>
						<Link
							href="/signup"
							className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
						>
							Novo usuário?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
