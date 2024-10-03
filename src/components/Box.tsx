/** @format */

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useUser } from "@/context/UserContext"; // Correctly import useUser
import { auth } from "../../firebase"; // Ensure the path to firebase.ts is correct
import Link from "next/link"; // Import Link for navigation

type Props = {
	children: ReactNode;
};

const Box = ({ children }: Props) => {
	const router = useRouter();
	const { user } = useUser(); // Use the custom hook directly

	const handleLogout = async () => {
		try {
			await signOut(auth); // Sign out the user
			router.push("/"); // Redirect to login page after logout
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<div style={{ padding: "20px" }}>
			<header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<h1>Bem vindo, {user ? user.email : "Anonimo"}</h1> {/* Handle user null case */}
				<div style={{ display: "flex", alignItems: "center" }}>
					<Link
						href="/create"
						style={{ marginRight: "20px", textDecoration: "none", color: "#0070f3" }}
					>
						Adicionar
					</Link>
					<Link
						href="/read"
						style={{ marginRight: "20px", textDecoration: "none", color: "#0070f3" }}
					>
						Função GET
					</Link>
					<Link
						href="/imagem"
						style={{ marginRight: "20px", textDecoration: "none", color: "#0070f3" }}
					>
						Adicionar Imagem
					</Link>
					<Link
						href="/getimage"
						style={{ marginRight: "20px", textDecoration: "none", color: "#0070f3" }}
					>
						Todas Imagens
					</Link>
					<button
						onClick={handleLogout}
						style={{ padding: "8px", backgroundColor: "red", color: "white" }}
					>
						Logout
					</button>
				</div>
			</header>

			<main style={{ marginTop: "20px" }}>
				{children} {/* Render the child components (page content) */}
			</main>
		</div>
	);
};

export default Box;
