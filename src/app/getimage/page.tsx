/** @format */
"use client";

import React, { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import Image from "next/image";
import { storage } from "../../../firebase";
import Box from "@/components/Box";

const ImageGallery = () => {
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [imageRefs, setImageRefs] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	// Fetch all images from Firebase Storage
	const fetchImages = async () => {
		try {
			const imagesRef = ref(storage, "images/");
			const res = await listAll(imagesRef);

			const urls = await Promise.all(
				res.items.map(async (item) => {
					const downloadURL = await getDownloadURL(item);
					return downloadURL;
				})
			);

			setImageUrls(urls);
			setImageRefs(res.items); // Store the references to be used for deletion
			setLoading(false);
		} catch (error) {
			console.error("Error fetching images:", error);
			setLoading(false);
		}
	};

	// Handle the deletion of an image
	const handleDelete = async (index: number) => {
		try {
			const imageRef = imageRefs[index];
			await deleteObject(imageRef);

			// Remove the deleted image from the list
			const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
			setImageUrls(updatedImageUrls);

			console.log("Image deleted successfully.");
		} catch (error) {
			console.error("Error deleting image:", error);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<Box>
			<div>
				<h2>Galeria</h2>
				{loading ? (
					<p>Carregando images...</p>
				) : (
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
							gap: "20px",
						}}
					>
						{imageUrls.map((url, index) => (
							<div
								key={index}
								style={{ textAlign: "center" }}
							>
								<Image
									src={url}
									alt={`Image ${index + 1}`}
									width={200}
									height={200}
									style={{ objectFit: "cover", borderRadius: "8px" }}
								/>
								<a
									href={url}
									download={`image-${index + 1}`}
									style={{ display: "block", marginTop: "10px" }}
								>
									<button>Download</button>
								</a>
								<button
									style={{ marginTop: "10px", backgroundColor: "red", color: "white", padding: "5px 10px" }}
									onClick={() => handleDelete(index)}
								>
									Deletar
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</Box>
	);
};

export default ImageGallery;
