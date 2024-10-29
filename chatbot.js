function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();
    
    if (message) {
        addMessage("User", message);
        userInput.value = "";
        
        // Respons sederhana dari chatbot
        setTimeout(() => {
            let response = getChatbotResponse(message);
            addMessage("Chatbot", response);
        }, 500);
    }
}

function addMessage(sender, message) {
    const messagesContainer = document.getElementById("chatbot-messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getChatbotResponse(message) {
    const responses = {
        
"halo": "Halo! Ada yang bisa saya bantu?",
"nama kamu siapa": "Saya adalah chatbot portfolio Kevin Rahul Juandri.",
"apa keahlian kamu": "Saya bisa menjelaskan informasi di portofolio ini.",
"terima kasih": "Sama-sama! Senang bisa membantu 😊",
        "siapa kamu": "Saya adalah chatbot portfolio Kevin Rahul Juandri. Saya di sini untuk membantu menjawab pertanyaan Anda tentang portofolio ini.",
        "ceritakan tentang dirimu": "Nama saya Kevin Rahul Juandri, seorang frontend developer dengan minat besar dalam pengembangan web, terutama dalam HTML, CSS, dan JavaScript.",
        "apa keahlian utamamu": "Keahlian utama saya meliputi HTML, CSS, JavaScript, serta berbagai framework frontend lainnya.",
        "apa pekerjaan yang pernah kamu lakukan": "Saya telah bekerja pada beberapa proyek pribadi dan proyek klien yang bisa Anda lihat di bagian Projects portofolio ini.",
        "apa proyek yang sudah kamu selesaikan": "Anda dapat melihat proyek-proyek saya di bagian 'Projects' dalam portofolio ini atau kunjungi GitHub saya.",
        "di mana saya bisa melihat hasil karyamu": "Anda bisa melihatnya di bagian 'Projects' atau langsung di GitHub saya.",
        "punya pengalaman di perusahaan mana saja": "Saat ini, pengalaman saya sebagian besar berasal dari proyek pribadi dan kolaborasi freelance.",
        "bahasa pemrograman apa yang kamu kuasai": "Saya menguasai HTML, CSS, JavaScript, dan memiliki dasar yang kuat dalam PHP dan Python.",
        "kamu bekerja dengan framework apa saja": "Framework yang saya gunakan terutama adalah Bootstrap dan beberapa library JavaScript lainnya.",
        "apakah kamu bisa frontend dan backend": "Fokus utama saya adalah frontend development, tetapi saya juga memiliki pemahaman dasar tentang backend seperti PHP dan MySQL.",
        "bagaimana cara menghubungimu": "Anda dapat menghubungi saya melalui email kevinrahuljuandri765@gmail.com atau melalui WhatsApp.",
        "apakah kamu sedang mencari pekerjaan": "Saya selalu terbuka untuk peluang baru! Jangan ragu untuk menghubungi saya jika Anda memiliki tawaran.",
        "bisa bekerja secara remote": "Ya, saya dapat bekerja secara remote dan memiliki pengalaman dalam berkolaborasi jarak jauh.",
        "bisakah saya download cv-mu": "Tentu! Silakan klik tombol 'Download CV' di bagian atas.",
        "apa yang kamu sukai dari dunia pemrograman": "Saya suka membuat hal-hal interaktif dan memecahkan masalah. Pemrograman memberikan tantangan yang selalu saya nikmati.",
        "kenapa memilih karir di bidang frontend": "Frontend memungkinkan saya untuk menggabungkan kreativitas dan keterampilan teknis, dan saya senang melihat hasil yang langsung terlihat."
    };

    return responses[message.toLowerCase()] || "Maaf, saya belum memahami pertanyaan tersebut.";
}
function toggleChatbot() {
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatbotToggleButton = document.getElementById("chatbot-toggle-btn");

    chatbotContainer.classList.toggle("active");

    if (chatbotContainer.classList.contains("active")) {
        chatbotToggleButton.style.display = "none";
    } else {
        chatbotToggleButton.style.display = "block";
    }
}

function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    if (userInput.value.trim() !== "") {
        // Display user's message
        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.textContent = userInput.value;
        chatbotMessages.appendChild(userMessage);

        // Get chatbot's response
        const botResponse = getChatbotResponse(userInput.value);
        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.textContent = botResponse;
        chatbotMessages.appendChild(botMessage);

        userInput.value = ""; // Clear input field
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to the latest message
    }
}
