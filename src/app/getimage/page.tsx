/** @format */
"use client";

import React, { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import Image from "next/image";
import { storage } from "../../../firebase";
import Box from "@/components/Box";
import { useTheme } from "@/context/ThemeContext";

const ImageGallery = () => {
	const { theme } = useTheme();
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

	const getThemeClasses = () => {
		switch (theme) {
			case "light":
				return {
					title: "text-3xl font-bold text-light-900 mb-8 text-center",
					loadingCard: "bg-white rounded-xl shadow-light-xl p-8 border border-light-200",
					loadingText: "text-light-700 text-center",
					galleryContainer: "bg-white rounded-xl shadow-light-xl border border-light-200 p-6",
					emptyState: "text-light-600 text-lg",
					imageCard: "bg-light-100 rounded-lg p-4 border border-light-300 card-hover",
					downloadButton: "w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					deleteButton: "w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
				};
			case "dark":
				return {
					title: "text-3xl font-bold text-dark-100 mb-8 text-center",
					loadingCard: "bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700",
					loadingText: "text-dark-300 text-center",
					galleryContainer: "bg-dark-800 rounded-xl shadow-dark-xl border border-dark-700 p-6",
					emptyState: "text-dark-400 text-lg",
					imageCard: "bg-dark-700 rounded-lg p-4 border border-dark-600 card-hover",
					downloadButton: "w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					deleteButton: "w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
				};
			case "liquid-glass":
				return {
					title: "text-3xl font-bold text-white mb-8 text-center",
					loadingCard: "glass-card rounded-xl shadow-glass-xl p-8 border border-white/25",
					loadingText: "text-white/80 text-center",
					galleryContainer: "glass-card rounded-xl shadow-glass-xl border border-white/25 p-6",
					emptyState: "text-white/70 text-lg",
					imageCard: "glass-card rounded-lg p-4 border border-white/25 card-hover float",
					downloadButton: "w-full glass-button hover:bg-white/25 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-glass-lg hover:shadow-glass-xl",
					deleteButton: "w-full bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-red-400/50"
				};
			default:
				return {
					title: "text-3xl font-bold text-dark-100 mb-8 text-center",
					loadingCard: "bg-dark-800 rounded-xl shadow-dark-xl p-8 border border-dark-700",
					loadingText: "text-dark-300 text-center",
					galleryContainer: "bg-dark-800 rounded-xl shadow-dark-xl border border-dark-700 p-6",
					emptyState: "text-dark-400 text-lg",
					imageCard: "bg-dark-700 rounded-lg p-4 border border-dark-600 card-hover",
					downloadButton: "w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
					deleteButton: "w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
				};
		}
	};

	const themeClasses = getThemeClasses();

	return (
		<Box>
			<div className="max-w-7xl mx-auto">
				<h2 className={themeClasses.title}>
					Galeria de Imagens
				</h2>
				
				{loading ? (
					<div className="flex justify-center items-center py-12">
						<div className={themeClasses.loadingCard}>
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
							<p className={themeClasses.loadingText}>Carregando imagens...</p>
						</div>
					</div>
				) : (
					<div className={themeClasses.galleryContainer}>
						{imageUrls.length === 0 ? (
							<div className="text-center py-12">
								<p className={themeClasses.emptyState}>Nenhuma imagem encontrada</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
								{imageUrls.map((url, index) => (
									<div
										key={index}
										className={themeClasses.imageCard}
									>
										<div className="aspect-square mb-4 overflow-hidden rounded-lg">
											<Image
												src={url}
												alt={`Image ${index + 1}`}
												width={200}
												height={200}
												className="w-full h-full object-cover"
											/>
										</div>
										
										<div className="space-y-3">
											<a
												href={url}
												download={`image-${index + 1}`}
												className="block w-full"
											>
												<button className={themeClasses.downloadButton}>
													Download
												</button>
											</a>
											
											<button
												className={themeClasses.deleteButton}
												onClick={() => handleDelete(index)}
											>
												Deletar
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</Box>
	);
};

export default ImageGallery;
