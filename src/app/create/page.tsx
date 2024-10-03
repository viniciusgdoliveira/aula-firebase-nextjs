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
			<div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff" }}>
				<h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Adicione um dado no FireStore</h1>
				<form
					onSubmit={handleSubmit}
					style={{ display: "flex", flexDirection: "column" }}
				>
					<input
						type="text"
						placeholder="Nome"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						required
						style={{ marginBottom: "10px", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" }}
					/>
					<input
						type="number"
						placeholder="Idade"
						value={idade}
						onChange={(e) => setIdade(e.target.value)}
						required
						style={{ marginBottom: "10px", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" }}
					/>
					<button
						type="submit"
						style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", transition: "background-color 0.3s" }}
					>
						Salvar
					</button>
					{error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
					{message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
				</form>
			</div>
		</Box>
	);
};

export default CreatePage;
