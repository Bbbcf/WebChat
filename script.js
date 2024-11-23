// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6kn3xlRUc31BmSfXk5QSYRZoW6ww2Gqc",
    authDomain: "webchat-12e6c.firebaseapp.com",
    projectId: "webchat-12e6c",
    storageBucket: "webchat-12e6c.firebasestorage.app",
    messagingSenderId: "1060701535993",
    appId: "1:1060701535993:web:b7266b523b0a4a78e2ac28",
    measurementId: "G-ESPSJKKTVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Load Messages from Firestore
const loadMessages = () => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    onSnapshot(q, (querySnapshot) => {
        messagesContainer.innerHTML = ""; // Clear messages container
        querySnapshot.forEach((doc) => {
            const messageData = doc.data();
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");
            messageDiv.textContent = messageData.content;
            messagesContainer.appendChild(messageDiv);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
    });
};

// Save Message to Firestore
const saveMessage = async (message) => {
    try {
        await addDoc(collection(db, "messages"), {
            content: message,
            timestamp: new Date(),
        });
        messageInput.value = ""; // Clear input field
    } catch (error) {
        console.error("Error adding message: ", error);
    }
};

// Send Button Event
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        saveMessage(message);
    }
});

// Load messages when the app starts
loadMessages();
