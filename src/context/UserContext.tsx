/** @format */
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../../firebase";

// Define the shape of the context state
interface UserContextProps {
	user: User | null;
	email: string | null;
	loading: boolean;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const auth = getAuth(app);
		// Monitor Firebase Auth state
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setEmail(user.email); // Get the user's email
			} else {
				setUser(null);
				setEmail(null);
			}
			setLoading(false);
		});

		return () => unsubscribe(); // Cleanup the listener on unmount
	}, []);

	return <UserContext.Provider value={{ user, email, loading }}>{loading ? <p>Loading...</p> : children}</UserContext.Provider>;
};

// Create a custom hook to consume the context
export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
