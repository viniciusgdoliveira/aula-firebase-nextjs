[Leia em Português](./README.pt-br.md) | [Read in English](./README.md)

# Firebase with Next.js Class

This project demonstrates the integration of **Next.js**, **Firebase**, **Firestore**, **Cloud Storage**, and **Vercel**. The goal is to create an application with user authentication, document management in Firestore, image uploads in Cloud Storage, and deploy the app on Vercel.

The application is online and can be accessed [here](https://aula-firebase.vercel.app/).

## Technologies Used

- **Next.js**: React framework for building the interface and dynamic pages.
- **Firebase Authentication**: User authentication using email and password.
- **Firestore**: NoSQL database for document storage.
- **Firebase Cloud Storage**: Cloud storage for files, such as images.
- **Vercel**: Platform used to deploy the application.
- **React Context**: Global state management for authentication and page navigation.

## Features

### 1. Login Page
- User login with email and password.
- Links to **Sign Up** and **Forgot Password**, using Firebase Authentication.

### 2. Authentication with React Context
- The authentication state is managed with React Context, ensuring the user's email is available after login.

### 3. Available Pages (after login)
The **header** displays links for navigation between pages and shows the authenticated user's email.

- **Create**: Allows adding a document to Firestore with custom fields.
- **Get Function**: Lists all documents added to Firestore, with **update** and **delete** buttons for each document.
- **Add Image**: Uploads an image to Firebase Cloud Storage and provides a download link.
- **Get Images**: Lists all images stored in Cloud Storage, with **download** and **delete** buttons for each image.

## Environment Variables
Environment variables were used to store Firebase credentials in the `.env.local` file.

## Deploy
After development, the application was deployed on **Vercel** and is available at: [aula-firebase.vercel.app](https://aula-firebase.vercel.app/).

## How to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/viniciusgdoliveira/aula-firebase-nextjs.git

2. Install dependencies:
   ```bash
   npm install

3. Set up environment variables: Create a .env.local file in the root of the project and add your Firebase credentials:

   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   
4. Run the project:
   ```bash
   npm run dev

5. Access the application locally:
   Open http://localhost:3000 in your browser.


## Contributions
Contributions, issues, and pull requests are welcome! Feel free to improve or expand this project.




