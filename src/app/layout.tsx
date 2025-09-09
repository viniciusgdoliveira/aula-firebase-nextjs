/** @format */
import { UserProvider } from "@/context/UserContext";
import React from "react";
import "./globals.css";

export const metadata = {
	title: "App do V",
	description: "Aqueeeele APP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className="bg-dark-900 text-dark-100 font-sans antialiased">
				<UserProvider>{children}</UserProvider>
			</body>
		</html>
	);
}
