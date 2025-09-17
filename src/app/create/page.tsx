/** @format */
"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { addDoc, collection } from "firebase/firestore"; // Import Firestore functions
import Box from "@/components/Box";
import { db } from "../../../firebase";
import { useTheme } from "@/context/ThemeContext";

// Ensure this file is treated as a Client Component

const CreatePage = () => {
	const { user } = useUser(); // Access user context
	const { theme } = useTheme();
	const [nome, setNome] = useState("");
	const [idade, setIdade] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(""); // Clear any previous errors
		setMessage(""); // Clear previous messages

		if (!user) {
			setError("User not authenticated.");
			return;
		}

		try {
			// Define a collection reference for users in Firestore
			const usersCollectionRef = collection(db, "users");
			// Add a new document to the collection with a generated UID
			await addDoc(usersCollectionRef, {
				nome,
				idade,
				userId: user.uid, // Optionally store the user's UID with the document
			});
			setMessage("Dado salvo!");
			setNome(""); // Clear the input field
			setIdade(""); // Clear the input field
		} catch (error) {
			setError("Failed to save data. Please try again.");
			console.error("Error saving data:", error);
		}
	};

	const getThemeClasses = () => {
		switch (theme) {
			case "light":
				return {
					card: "bg-white rounded-xl shadow-light-xl p-8 border border-light-200 card-hover",
					title: "text-3xl font-bold text-light-900 text-center mb-8",
					label: "block text-sm font-medium text-light-700 mb-2",
					input: "w-full px-4 py-3 bg-light-100 border border-light-300 rounded-lg text-light-900 placeholder-light-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
					button: "w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
					error: "bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg",
					success: "bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
				};
			case "dark":
				return {
					card: "bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700 card-hover",
					title: "text-3xl font-bold text-dark-100 text-center mb-8",
					label: "block text-sm font-medium text-dark-300 mb-2",
					input: "w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
					button: "w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
					error: "bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg",
					success: "bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg"
				};
			case "liquid-glass":
				return {
					card: "glass-card rounded-xl shadow-glass-xl p-8 border border-white/25 card-hover float",
					title: "text-3xl font-bold text-white text-center mb-8",
					label: "block text-sm font-medium text-white/90 mb-2",
					input: "w-full px-4 py-3 glass-input rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
					button: "w-full glass-button hover:bg-white/25 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-glass-lg hover:shadow-glass-xl transform hover:-translate-y-0.5",
					error: "bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm",
					success: "bg-green-500/20 border border-green-400/50 text-green-200 px-4 py-3 rounded-lg backdrop-blur-sm"
				};
			default:
				return {
					card: "bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700 card-hover",
					title: "text-3xl font-bold text-dark-100 text-center mb-8",
					label: "block text-sm font-medium text-dark-300 mb-2",
					input: "w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
					button: "w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
					error: "bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg",
					success: "bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg"
				};
		}
	};

	const themeClasses = getThemeClasses();

	return (
		<Box>
			<div className="max-w-2xl mx-auto">
				<div className={themeClasses.card}>
					<h1 className={themeClasses.title}>
						Adicione um dado no FireStore
					</h1>
					
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="nome" className={themeClasses.label}>
								Nome
							</label>
							<input
								id="nome"
								type="text"
								placeholder="Digite o nome"
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								required
								className={themeClasses.input}
							/>
						</div>
						
						<div>
							<label htmlFor="idade" className={themeClasses.label}>
								Idade
							</label>
							<input
								id="idade"
								type="number"
								placeholder="Digite a idade"
								value={idade}
								onChange={(e) => setIdade(e.target.value)}
								required
								className={themeClasses.input}
							/>
						</div>
						
						<button
							type="submit"
							className={themeClasses.button}
						>
							Salvar
						</button>
						
						{error && (
							<div className={themeClasses.error}>
								{error}
							</div>
						)}
						
						{message && (
							<div className={themeClasses.success}>
								{message}
							</div>
						)}
					</form>
				</div>
			</div>
		</Box>
	);
};

export default CreatePage;
