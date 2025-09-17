/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust path as necessary
import Box from "../../components/Box"; // Import Box component
import { useUser } from "@/context/UserContext"; // Import user context
import { useTheme } from "@/context/ThemeContext";

interface User {
	id: string; // UUID
	nome: string; // User name
	idade: number; // User age
}

const Read = () => {
	const { user } = useUser(); // Get the authenticated user
	const { theme } = useTheme();
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

	const getThemeClasses = () => {
		switch (theme) {
			case "light":
				return {
					title: "text-3xl font-bold text-light-900 mb-8 text-center",
					error: "bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6",
					tableContainer: "bg-white rounded-xl shadow-light-xl border border-light-200 overflow-hidden",
					tableHeader: "bg-light-100",
					headerCell: "px-6 py-4 text-left text-sm font-semibold text-light-800 border-b border-light-300",
					tableBody: "divide-y divide-light-200",
					tableRow: "hover:bg-light-50 transition-colors duration-200",
					tableRowAlt: "bg-light-50",
					tableCell: "px-6 py-4 text-light-900",
					input: "w-full px-3 py-2 bg-white border border-light-300 rounded-lg text-light-900 placeholder-light-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
					editButton: "bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					deleteButton: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					saveButton: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					emptyState: "text-light-600 text-lg"
				};
			case "dark":
				return {
					title: "text-3xl font-bold text-dark-100 mb-8 text-center",
					error: "bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6",
					tableContainer: "bg-dark-800 rounded-xl shadow-dark-xl border border-dark-700 overflow-hidden",
					tableHeader: "bg-dark-700",
					headerCell: "px-6 py-4 text-left text-sm font-semibold text-dark-200 border-b border-dark-600",
					tableBody: "divide-y divide-dark-600",
					tableRow: "hover:bg-dark-700/50 transition-colors duration-200",
					tableRowAlt: "bg-dark-800/50",
					tableCell: "px-6 py-4 text-dark-100",
					input: "w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
					editButton: "bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					deleteButton: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					saveButton: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					emptyState: "text-dark-400 text-lg"
				};
			case "liquid-glass":
				return {
					title: "text-3xl font-bold text-white mb-8 text-center",
					error: "bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm",
					tableContainer: "glass-card rounded-xl shadow-glass-xl border border-white/25 overflow-hidden",
					tableHeader: "glass-effect",
					headerCell: "px-6 py-4 text-left text-sm font-semibold text-white/90 border-b border-white/25",
					tableBody: "divide-y divide-white/20",
					tableRow: "hover:bg-white/10 transition-colors duration-200",
					tableRowAlt: "bg-white/5",
					tableCell: "px-6 py-4 text-white",
					input: "w-full px-3 py-2 glass-input rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
					editButton: "glass-button hover:bg-white/25 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-glass-lg hover:shadow-glass-xl",
					deleteButton: "bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-red-400/50",
					saveButton: "bg-green-500/20 hover:bg-green-500/30 text-green-200 px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-green-400/50",
					emptyState: "text-white/70 text-lg"
				};
			default:
				return {
					title: "text-3xl font-bold text-dark-100 mb-8 text-center",
					error: "bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6",
					tableContainer: "bg-dark-800 rounded-xl shadow-dark-xl border border-dark-700 overflow-hidden",
					tableHeader: "bg-dark-700",
					headerCell: "px-6 py-4 text-left text-sm font-semibold text-dark-200 border-b border-dark-600",
					tableBody: "divide-y divide-dark-600",
					tableRow: "hover:bg-dark-700/50 transition-colors duration-200",
					tableRowAlt: "bg-dark-800/50",
					tableCell: "px-6 py-4 text-dark-100",
					input: "w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
					editButton: "bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					deleteButton: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					saveButton: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					emptyState: "text-dark-400 text-lg"
				};
		}
	};

	const themeClasses = getThemeClasses();

	return (
		<Box>
			<div className="max-w-6xl mx-auto">
				<h2 className={themeClasses.title}>
					Lista de dados do FireStore
				</h2>
				
				{error && (
					<div className={themeClasses.error}>
						{error}
					</div>
				)}
				
				<div className={themeClasses.tableContainer}>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className={themeClasses.tableHeader}>
								<tr>
									<th className={themeClasses.headerCell}>
										Nome
									</th>
									<th className={themeClasses.headerCell}>
										Idade
									</th>
									<th className={themeClasses.headerCell}>
										Ações
									</th>
								</tr>
							</thead>
							<tbody className={themeClasses.tableBody}>
								{users.map((user, index) => (
									<tr
										key={user.id}
										className={`${themeClasses.tableRow} ${
											index % 2 === 0 ? themeClasses.tableRowAlt : ""
										}`}
									>
										<td className={themeClasses.tableCell}>
											{editingUser?.id === user.id ? (
												<input
													type="text"
													value={newNome}
													onChange={(e) => setNewNome(e.target.value)}
													placeholder="Novo Nome"
													className={themeClasses.input}
												/>
											) : (
												user.nome
											)}
										</td>
										<td className={themeClasses.tableCell}>
											{editingUser?.id === user.id ? (
												<input
													type="number"
													value={newIdade}
													onChange={(e) => setNewIdade(e.target.value)}
													placeholder="Nova Idade"
													className={themeClasses.input}
												/>
											) : (
												user.idade
											)}
										</td>
										<td className={themeClasses.tableCell}>
											<div className="flex space-x-2">
												{editingUser?.id === user.id ? (
													<button
														onClick={() => handleUpdate(user.id)}
														className={themeClasses.saveButton}
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
															className={themeClasses.editButton}
														>
															Editar
														</button>
														<button
															onClick={() => handleDelete(user.id)}
															className={themeClasses.deleteButton}
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
							<p className={themeClasses.emptyState}>Nenhum dado encontrado</p>
						</div>
					)}
				</div>
			</div>
		</Box>
	);
};

export default Read;
