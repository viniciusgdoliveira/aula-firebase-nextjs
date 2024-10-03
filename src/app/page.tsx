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
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
			<h1 style={{ marginBottom: "20px" }}>Bem vindo!</h1>
			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column", width: "300px" }}
			>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
					style={{ marginBottom: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
					style={{ marginBottom: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
				/>
				<button
					type="submit"
					style={{ padding: "10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
				>
					Entrar
				</button>
			</form>
			<div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", width: "300px" }}>
				<Link
					href="/signup"
					style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
				>
					Cadastrar e-mail
				</Link>
				<Link
					href="/forgotpassword"
					style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
				>
					Esqueceu a senha?
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
