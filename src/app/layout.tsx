/** @format */
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";
import "./globals.css";

export const metadata = {
	title: "App do V",
	description: "Aqueeeele APP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="theme-transition">
				<ThemeProvider>
					<UserProvider>{children}</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
