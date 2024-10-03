/** @format */
import { UserProvider } from "@/context/UserContext";
import React from "react";

export const metadata = {
	title: "App do V",
	description: "Aqueeeele APP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<UserProvider>{children}</UserProvider>
			</body>
		</html>
	);
}
