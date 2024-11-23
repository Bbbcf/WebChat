// Khởi tạo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC6kn3xlRUc31BmSfXk5QSYRZoW6ww2Gqc",
  authDomain: "webchat-12e6c.firebaseapp.com",
  databaseURL: "https://webchat-12e6c-default-rtdb.firebaseio.com",
  projectId: "webchat-12e6c",
  storageBucket: "webchat-12e6c.appspot.com",
  messagingSenderId: "1060701535993",
  appId: "1:1060701535993:web:b7266b523b0a4a78e2ac28",
  measurementId: "G-ESPSJKKTVB"
};

// Khởi tạo Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Lấy tham chiếu đến nút gửi tin nhắn và input
const sendButton = document.getElementById("sendButton");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

// Hàm gửi tin nhắn lên Firebase Realtime Database
function sendMessage() {
  const messageText = messageInput.value;
  if (messageText.trim() !== "") {
    const newMessageRef = database.ref('messages/').push();
    newMessageRef.set({
      text: messageText,
      timestamp: Date.now()
    })
    .then(() => {
      messageInput.value = "";  // Xóa ô nhập sau khi gửi
    })
    .catch((error) => {
      console.error("Lỗi gửi tin nhắn: ", error);
    });
  }
}

// Lắng nghe sự kiện khi nhấn nút gửi
sendButton.addEventListener('click', sendMessage);

// Hàm nhận tin nhắn từ Firebase Realtime Database và cập nhật UI
function receiveMessages() {
  const messagesRef = database.ref('messages/');
  
  messagesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    chatBox.innerHTML = ""; // Xóa chat box trước khi thêm tin nhắn mới
    
    // Lặp qua tất cả tin nhắn và hiển thị chúng
    for (let key in data) {
      const message = data[key];
      const messageElement = document.createElement('div');
      messageElement.textContent = message.text;
      chatBox.appendChild(messageElement);
    }

    // Cuộn xuống cuối khi nhận được tin nhắn mới
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Bắt đầu lắng nghe tin nhắn
receiveMessages();
