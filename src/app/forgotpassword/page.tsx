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
			setMessage("Check your inbox for further instructions to reset your password.");
			setEmail(""); // Clear email input after sending the reset email
			router.push("/"); // Redirect to the login page
		} catch {
			setError("Failed to send password reset email. Please check your email address.");
		}
	};

	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
			<form
				onSubmit={handleResetPassword}
				style={{ display: "flex", flexDirection: "column", width: "300px", padding: "20px" }}
			>
				<h2 style={{ marginBottom: "20px" }}>Esqueceu a senha?</h2>

				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					style={{ marginBottom: "10px", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
				/>

				{error && <p style={{ color: "red" }}>{error}</p>}
				{message && <p style={{ color: "green" }}>{message}</p>}

				<button
					type="submit"
					style={{ padding: "10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
				>
					Enviar e-mail para resetar
				</button>

				<div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
					<Link
						href="/"
						style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
					>
						Voltar para Login
					</Link>
					<Link
						href="/signup"
						style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
					>
						Novo usuário?
					</Link>
				</div>
			</form>
		</div>
	);
}
