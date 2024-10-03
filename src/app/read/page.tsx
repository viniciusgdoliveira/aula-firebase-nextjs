/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust path as necessary
import Box from "../../components/Box"; // Import Box component
import { useUser } from "@/context/UserContext"; // Import user context

interface User {
	id: string; // UUID
	nome: string; // User name
	idade: number; // User age
}

const Read = () => {
	const { user } = useUser(); // Get the authenticated user
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState("");
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [newNome, setNewNome] = useState(""); // New name for editing
	const [newIdade, setNewIdade] = useState(""); // New age for editing

	// Fetch users from Firestore
	const fetchUsers = async () => {
		if (!user) return; // Ensure user is authenticated
		const usersCollection = collection(db, "users");
		const userDocs = await getDocs(usersCollection);
		const userData: User[] = userDocs.docs.map((doc) => ({
			id: doc.id, // This will be the UUID
			...doc.data(),
		})) as User[]; // Cast to User type
		setUsers(userData);
	};

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]); // Refetch when user changes

	// Handle updating a user
	const handleUpdate = async (id: string) => {
		try {
			const userRef = doc(db, "users", id); // Use UUID to reference the document
			await setDoc(userRef, {
				nome: newNome,
				idade: parseInt(newIdade), // Convert idade to a number
			});
			setEditingUser(null); // Close edit mode
			setNewNome(""); // Clear newNome
			setNewIdade(""); // Clear newIdade
			fetchUsers(); // Refetch users to get updated data
		} catch (error) {
			console.error("Error updating user: ", error);
			setError("Failed to update user. Please try again.");
		}
	};

	// Handle deleting a user
	const handleDelete = async (id: string) => {
		try {
			const userRef = doc(db, "users", id); // Use UUID to reference the document
			await deleteDoc(userRef);
			fetchUsers(); // Refetch users after deletion
		} catch (error) {
			console.error("Error deleting user: ", error);
			setError("Failed to delete user. Please try again.");
		}
	};

	return (
		<Box>
			<h2>Lista de dados do FireStore</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
				<thead>
					<tr>
						<th style={{ padding: "12px", textAlign: "left", background: "#f2f2f2", borderBottom: "2px solid #ccc" }}>Name</th>
						<th style={{ padding: "12px", textAlign: "left", background: "#f2f2f2", borderBottom: "2px solid #ccc" }}>Age</th>
						<th style={{ padding: "12px", textAlign: "left", background: "#f2f2f2", borderBottom: "2px solid #ccc" }}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr
							key={user.id}
							style={{ borderBottom: "1px solid #ddd", background: index % 2 === 0 ? "#f9f9f9" : "#fff" }}
						>
							<td style={{ padding: "12px", textAlign: "left" }}>
								{editingUser?.id === user.id ? (
									<input
										type="text"
										value={newNome}
										onChange={(e) => setNewNome(e.target.value)}
										placeholder="New name"
										style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}
									/>
								) : (
									user.nome
								)}
							</td>
							<td style={{ padding: "12px", textAlign: "left" }}>
								{editingUser?.id === user.id ? (
									<input
										type="number"
										value={newIdade}
										onChange={(e) => setNewIdade(e.target.value)}
										placeholder="New age"
										style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}
									/>
								) : (
									user.idade
								)}
							</td>
							<td style={{ padding: "12px", textAlign: "left" }}>
								{editingUser?.id === user.id ? (
									<button
										onClick={() => handleUpdate(user.id)}
										style={{ background: "#4CAF50", color: "white", border: "none", padding: "10px 15px", borderRadius: "4px", cursor: "pointer" }}
									>
										Save
									</button>
								) : (
									<>
										<button
											onClick={() => {
												setEditingUser(user);
												setNewNome(user.nome);
												setNewIdade(user.idade.toString());
											}}
											style={{ background: "#2196F3", color: "white", border: "none", padding: "10px 15px", borderRadius: "4px", cursor: "pointer" }}
										>
											Editar
										</button>
										<button
											onClick={() => handleDelete(user.id)}
											style={{ background: "#f44336", color: "white", border: "none", padding: "10px 15px", borderRadius: "4px", marginLeft: "5px", cursor: "pointer" }}
										>
											Deletar
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Box>
	);
};

export default Read;
