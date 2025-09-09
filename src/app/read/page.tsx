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
			console.error("Erro: ", error);
			setError("Erro.");
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
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold text-dark-100 mb-8 text-center">
					Lista de dados do FireStore
				</h2>
				
				{error && (
					<div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
						{error}
					</div>
				)}
				
				<div className="bg-dark-800 rounded-xl shadow-dark-xl border border-dark-700 overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-dark-700">
								<tr>
									<th className="px-6 py-4 text-left text-sm font-semibold text-dark-200 border-b border-dark-600">
										Nome
									</th>
									<th className="px-6 py-4 text-left text-sm font-semibold text-dark-200 border-b border-dark-600">
										Idade
									</th>
									<th className="px-6 py-4 text-left text-sm font-semibold text-dark-200 border-b border-dark-600">
										Ações
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-dark-600">
								{users.map((user, index) => (
									<tr
										key={user.id}
										className={`hover:bg-dark-700/50 transition-colors duration-200 ${
											index % 2 === 0 ? "bg-dark-800" : "bg-dark-800/50"
										}`}
									>
										<td className="px-6 py-4 text-dark-100">
											{editingUser?.id === user.id ? (
												<input
													type="text"
													value={newNome}
													onChange={(e) => setNewNome(e.target.value)}
													placeholder="Novo Nome"
													className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
												/>
											) : (
												user.nome
											)}
										</td>
										<td className="px-6 py-4 text-dark-100">
											{editingUser?.id === user.id ? (
												<input
													type="number"
													value={newIdade}
													onChange={(e) => setNewIdade(e.target.value)}
													placeholder="Nova Idade"
													className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
												/>
											) : (
												user.idade
											)}
										</td>
										<td className="px-6 py-4">
											<div className="flex space-x-2">
												{editingUser?.id === user.id ? (
													<button
														onClick={() => handleUpdate(user.id)}
														className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
													>
														Salvar
													</button>
												) : (
													<>
														<button
															onClick={() => {
																setEditingUser(user);
																setNewNome(user.nome);
																setNewIdade(user.idade.toString());
															}}
															className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
														>
															Editar
														</button>
														<button
															onClick={() => handleDelete(user.id)}
															className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
														>
															Deletar
														</button>
													</>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					
					{users.length === 0 && (
						<div className="text-center py-12">
							<p className="text-dark-400 text-lg">Nenhum dado encontrado</p>
						</div>
					)}
				</div>
			</div>
		</Box>
	);
};

export default Read;
