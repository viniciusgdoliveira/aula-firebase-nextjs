/** @format */
"use client";

import React, { useState } from "react";
import { storage } from "../../../firebase"; // Adjust the path as necessary
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import required Firebase Storage functions
import Box from "../../components/Box"; // Import Box component
import Image from "next/image";

const UploadImage = () => {
	const [image, setImage] = useState<File | null>(null); // Store the image file
	const [imageUrl, setImageUrl] = useState<string | null>(null); // Store the image URL after upload
	const [error, setError] = useState<string>(""); // Store error messages

	// Handle image file selection
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImage(file);
			setError(""); // Clear previous errors
		}
	};

	// Handle image upload
	const handleUpload = async () => {
		if (!image) {
			setError("Please select an image to upload.");
			return;
		}

		try {
			const imageRef = ref(storage, `images/${image.name}`); // Create a reference in Firebase Storage
			await uploadBytes(imageRef, image); // Upload the image
			const url = await getDownloadURL(imageRef); // Get the download URL
			setImageUrl(url); // Set the image URL for display
			setImage(null); // Clear the selected image
		} catch (error) {
			console.error("Error uploading image: ", error);
			setError("Failed to upload image. Please try again.");
		}
	};

	return (
		<Box>
			<div className="max-w-4xl mx-auto">
				<div className="bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700 card-hover">
					<h2 className="text-3xl font-bold text-dark-100 text-center mb-8">
						Upload de Imagem
					</h2>
					
					{error && (
						<div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
							{error}
						</div>
					)}
					
					<div className="space-y-6">
						<div>
							<label htmlFor="image-upload" className="block text-sm font-medium text-dark-300 mb-2">
								Selecionar Imagem
							</label>
							<input
								id="image-upload"
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
							/>
						</div>
						
						<button
							onClick={handleUpload}
							disabled={!image}
							className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-dark-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
						>
							{image ? "Upload Imagem" : "Selecione uma imagem primeiro"}
						</button>
						
						{imageUrl && (
							<div className="mt-8 space-y-4">
								<h3 className="text-xl font-semibold text-dark-100">Imagem Carregada:</h3>
								
								<div className="flex justify-center mb-4">
									<a
										href={imageUrl}
										download
										className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
									>
										Download da Imagem
									</a>
								</div>
								
								<div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
									<Image
										src={imageUrl}
										alt="Uploaded"
										width={800}
										height={600}
										className="w-full h-auto rounded-lg"
										style={{ objectFit: "contain" }}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Box>
	);
};

export default UploadImage;
