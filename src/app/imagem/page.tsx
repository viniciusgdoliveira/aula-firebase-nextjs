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
			<h2>Upload Imagem</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
			/>
			<button
				onClick={handleUpload}
				style={{ marginTop: "10px", background: "#4CAF50", color: "white", border: "none", padding: "10px 15px", borderRadius: "4px", cursor: "pointer" }}
			>
				Upload
			</button>
			{imageUrl && (
				<div style={{ marginTop: "20px" }}>
					<h3>Uploaded Image:</h3>
					<a
						href={imageUrl}
						download
						style={{ display: "inline-block", marginBottom: "10px" }}
					>
						<button style={{ background: "#2196F3", color: "white", border: "none", padding: "10px 15px", borderRadius: "4px", cursor: "pointer" }}>Download Image</button>
					</a>
					<div style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "4px" }}>
						<Image
							src={imageUrl}
							alt="Uploaded"
							width={800} // Set the width (you can adjust based on your requirements)
							height={600} // Set the height (you can adjust based on your requirements)
							style={{ borderRadius: "4px" }}
							objectFit="contain" // This ensures the image fits within the given width and height
						/>
					</div>
				</div>
			)}
		</Box>
	);
};

export default UploadImage;
