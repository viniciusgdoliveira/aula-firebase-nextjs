/** @format */
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Link from "next/link";

export default function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(""); // Clear any previous errors

		try {
			await signInWithEmailAndPassword(auth, email, password);
			// Redirect to the dashboard or homepage after successful login
			router.push("/create");
		} catch {
			// Handle login error
			setError("Invalid email or password");
		}
	};

	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
			<form
				onSubmit={handleLogin}
				style={{ display: "flex", flexDirection: "column", width: "300px" }}
			>
				<h2>Login</h2>

				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					style={{ marginBottom: "10px", padding: "8px" }}
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					style={{ marginBottom: "10px", padding: "8px" }}
				/>

				{error && <p style={{ color: "red" }}>{error}</p>}

				<button
					type="submit"
					style={{ padding: "8px", backgroundColor: "blue", color: "white", cursor: "pointer" }}
				>
					Login
				</button>
				<div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
					<Link
						href="/signup"
						style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
					>
						Novo usuário?
					</Link>
					<Link
						href="/forgotpassword"
						style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
					>
						Esqueceu a senha?
					</Link>
				</div>
			</form>
		</div>
	);
}
