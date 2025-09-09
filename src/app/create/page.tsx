/** @format */
"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { addDoc, collection } from "firebase/firestore"; // Import Firestore functions
import Box from "@/components/Box";
import { db } from "../../../firebase";

// Ensure this file is treated as a Client Component

const CreatePage = () => {
	const { user } = useUser(); // Access user context
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

	return (
		<Box>
			<div className="max-w-2xl mx-auto">
				<div className="bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700 card-hover">
					<h1 className="text-3xl font-bold text-dark-100 text-center mb-8">
						Adicione um dado no FireStore
					</h1>
					
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="nome" className="block text-sm font-medium text-dark-300 mb-2">
								Nome
							</label>
							<input
								id="nome"
								type="text"
								placeholder="Digite o nome"
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								required
								className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
							/>
						</div>
						
						<div>
							<label htmlFor="idade" className="block text-sm font-medium text-dark-300 mb-2">
								Idade
							</label>
							<input
								id="idade"
								type="number"
								placeholder="Digite a idade"
								value={idade}
								onChange={(e) => setIdade(e.target.value)}
								required
								className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
							/>
						</div>
						
						<button
							type="submit"
							className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Salvar
						</button>
						
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
					</form>
				</div>
			</div>
		</Box>
	);
};

export default CreatePage;
