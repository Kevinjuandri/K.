// Fungsi untuk menambah pesan
function addMessage(sender, message) {
    const messagesContainer = document.getElementById("chatbot-messages");
    const messageElement = document.createElement("div");

    if (sender === "User") {
        messageElement.classList.add("user-message");
        messageElement.innerHTML = `
            <strong>${sender}:</strong> ${message}`;
    } else {
        messageElement.classList.add("bot-message");
        messageElement.innerHTML = `
            <strong>${sender}:</strong> ${message}`;
    }

    messagesContainer.appendChild(messageElement);

    // Scroll ke bawah setelah pesan ditambahkan
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
}

// Fungsi untuk mengirim pesan
function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();

    if (message) {
        addMessage("User", message);
        userInput.value = ""; // Kosongkan input setelah mengirim pesan

        // Respon chatbot dengan sedikit delay
        setTimeout(() => {
            let response = getChatbotResponse(message);
            addMessage("Chatbot", response);
        }, 500);
    }
}

// Fungsi untuk mendapatkan respons chatbot
function getChatbotResponse(message) {
    const messageLower = message.toLowerCase(); // Menjadikan pesan huruf kecil agar pencocokan lebih fleksibel

    // Menggunakan pola untuk mengenali beberapa pertanyaan umum
    const programmerPatterns = [
        { pattern: /hai|oi|halo|hey|halo bot|halo chatbot/, response: "Halo! Ada yang bisa gue bantu?" },
        { pattern: /siapa lo|siapa lo?|apa lo?|lo siapa sih/, response: "Gue chatbot portfolio Kevin Rahul Juandri, siap bantu lo!" },
        { pattern: /lagi ngapain|lagi sibuk apa|lagi ngoding apa/, response: "Lagi ngembangin portofolio, sibuk terus nih!" },
        { pattern: /lo bisa ngoding apa|lo bisa ngoding apa aja|bahasa pemrograman apa yang lo bisa/, response: "Gue bisa ngoding pake HTML, CSS, JavaScript, dan ngerti PHP dan Python juga!" },
        { pattern: /kenapa frontend|kenapa milih frontend|kenapa jadi frontend developer/, response: "Frontend itu keren, bisa langsung liat hasilnya di browser. Juga seru banget bikin tampilan interaktif!" },
        { pattern: /belajar ngoding dimana|belajar ngoding di mana|dimana belajar ngoding/, response: "Banyak tempat belajar, coba cek YouTube atau freeCodeCamp, banyak tutorial keren!" },
        { pattern: /kenapa ngoding|suka ngoding ga|kenapa suka ngoding/, response: "Ngoding itu menyenangkan, kayak main puzzle! Seru banget bisa ngelihat hasilnya langsung." },
        { pattern: /tips buat pemula|tips ngoding|ngoding buat pemula/, response: "Mulai aja dengan HTML dan CSS dulu, setelah itu pelajari JavaScript. Jangan takut salah, itu bagian dari belajar!" },
        { pattern: /belajar apa sekarang|lagi belajar apa|belajar apa aja/, response: "Gue lagi fokus belajar animasi dan Next.js, biar portofolio gue makin kece!" },
        { pattern: /gimana cara ngoding|cara ngoding gimana|gimana sih ngoding itu/, response: "Mulai aja dulu! Jangan terlalu khawatir, ada banyak tutorial di luar sana yang bisa bantu." },
        { pattern: /apa yang lo suka dari pemrograman|kenapa suka programming|kenapa suka coding/, response: "Suka banget! Ngoding itu seru, bisa nyelesain masalah dan bikin sesuatu yang berguna!" },
        { pattern: /kerja di mana|lagi kerja apa|kerja apa sekarang/, response: "Sekarang sih gue lagi ngembangin portofolio pribadi dan terus belajar hal baru." },
        { pattern: /pengen kerja di mana|kerja di perusahaan apa|mau kerja di mana/, response: "Gue terbuka untuk berbagai kesempatan, terutama yang berhubungan dengan frontend development!" },
        { pattern: /apa aja yang ada di portofolio lo|portofolio lo ada apa aja/, response: "Portofolio gue berisi proyek frontend development, animasi, dan tentu saja keterampilan web development!" },
        { pattern: /lo butuh kerjaan ga|lagi cari kerja ga|kerja remote ga/, response: "Gue selalu terbuka untuk peluang baru! Gue bisa kerja remote, lho!" },
        { pattern: /bisa kirim cv ga|dimana bisa download cv|cv lo ada dimana/, response: "Tentu! Lo bisa download CV gue di bagian atas portofolio." },
        { pattern: /berapa lama belajar ngoding|udah berapa lama ngoding/, response: "Gue udah ngoding cukup lama, tapi selalu ada hal baru yang dipelajari. Belajar itu proses!" },
        { pattern: /kenapa portofolio lo bagus|gimana bisa bikin portofolio kayak gitu/, response: "Portofolio gue dibangun dengan semangat dan terus belajar! Kalau lo mau tahu cara buatnya, gue bisa bantu!" },
        { pattern: /suka belajar ngoding dimana|ngoding di tempat apa|belajar coding dimana/, response: "Gue belajar banyak dari berbagai sumber seperti MDN, YouTube, dan tutorial online lainnya." },
        { pattern: /berapa umur lo|umur lo berapa|lo berapa tahun/, response: "Gue masih muda, tapi udah cukup pengalaman buat bantuin lo!" },
        { pattern: /lo orangnya gimana sih|sifat lo kayak gimana|sifat lo apa/, response: "Gue orangnya ramah, senang ngobrol, dan suka banget belajar hal baru!" },
        { pattern: /cewek tipe lo gimana|tipe cewek lo apa|lo suka cewek yang kayak gimana/, response: "Gue suka cewek yang bisa diajak ngobrol, punya passion, dan yang selalu positif!" },
        { pattern: /makanan favorit lo apa|lo suka makan apa|makanan kesukaan lo apa/, response: "Gue suka banget makanan pedas, kayak sambel dan ayam penyet! Tapi gue juga suka pizza, lho!" },
        { pattern: /hobinya apa|hobi lo apa|lo suka ngapain/, response: "Hobi gue ngoding, nonton film, dan kadang main game buat santai. Lo suka apa?" },
        { pattern: /kenapa suka ngoding|kenapa lo suka ngoding|ngoding itu apa sih yang bikin lo suka/, response: "Ngoding itu seru karena bisa bikin sesuatu dari nol, kayak bikin website atau aplikasi yang bermanfaat!" },
        { pattern: /kapan lo mulai ngoding|lo mulai ngoding dari kapan|udah berapa lama ngoding/, response: "Gue mulai ngoding sejak beberapa tahun yang lalu, dimulai dari HTML dan CSS dulu, terus berkembang ke JavaScript!" },
        { pattern: /lo kerja dimana|lagi kerja apa|kerja di mana sekarang/, response: "Gue lagi ngembangin portofolio pribadi, fokus di frontend development!" },
        { pattern: /lo tinggal dimana|rumah lo dimana|kamu tinggal di mana/, response: "Gue tinggal di Indonesia, tepatnya di Jakarta. Lo tinggal di mana?" },
        { pattern: /lo punya pacar ga|lagi deket sama siapa|status lo apa/, response: "Gue fokus sama kerjaan dan ngembangin portofolio sih, status masih single!" },
        { pattern: /lagi ngapain|lagi sibuk apa|lagi ngoding apa/, response: "Lagi ngerjain beberapa proyek frontend di portofolio nih. Sambil belajar hal baru juga!" },
        { pattern: /lo suka nonton apa|film favorit lo apa|lo suka film apa/, response: "Gue suka nonton film sci-fi atau drama, kayak Interstellar dan The Pursuit of Happyness." },
        { pattern: /lo sering banget online ya|kenapa lo selalu online|kenapa aktif banget sih/, response: "Gue suka banget belajar dan ngebantu orang, jadi biasanya online buat jawab pertanyaan dan nambahin fitur baru." },
        { pattern: /lo suka olahraga ga|olahraga apa yang lo suka|lo suka olahraga apa/, response: "Gue suka main basket, kadang jogging juga buat jaga badan!" },
        { pattern: /lo suka traveling ga|lo sering jalan-jalan ga|mau liburan kemana/, response: "Gue suka banget traveling! Mau liburan ke Bali atau ke luar negeri kalau ada kesempatan." },
        { pattern: /kalo lo punya uang banyak, mau beli apa|mau beli apa kalau kaya/, response: "Kalau punya banyak uang, gue pengen beli gadget terbaru dan invest di pendidikan buat belajar hal baru!" },
        { pattern: /lo suka musik apa|lagu favorit lo apa|musik favorit lo apa/, response: "Gue suka dengerin musik indie sama lagu luar si, tapi juga suka musik akustik yang santai." },
        { pattern: /lo punya hewan peliharaan ga|peliharaan lo apa|lo suka hewan ga/, response: "Gue nggak punya hewan peliharaan, tapi suka banget sama kucing dan anjing!" },
        { pattern: /lo suka ngumpul sama temen ga|lo suka nongkrong ga|lo sering hangout ga/, response: "Gue suka nongkrong sama temen-temen, ngobrolin hal-hal seru sambil makan-makan!" },
        { pattern: /lo tipe orang yang gimana|sifat lo gimana sih|lo tipe orang seperti apa/, response: "Gue tipe orang yang suka kerja keras, senang belajar hal baru, dan nggak suka berhenti di tengah jalan." },
        { pattern: /lo lebih suka kerja sendiri atau tim|lo tipe orang kerja sendiri atau tim/, response: "Gue lebih suka kerja tim, bisa saling bantu dan belajar dari satu sama lain!" },
        { pattern: /lo lebih suka pagi atau malam|lo suka bangun pagi atau tidur malam/, response: "Gue tipe orang yang suka bangun pagi, lebih produktif di pagi hari!" },
        { pattern: /lo suka apa aja sih selain ngoding|lo hobi selain ngoding apa|lo suka kegiatan lain ga/, response: "Selain ngoding, gue suka main game, nonton film, dan kadang ngejalanin hobi fotografi!" },
        { pattern: /lo punya cewe gak|lo punya pacar gak|/, response: "Punya lah! cewe gua cantik,baik,kuat,lucu, namanya naysca sekar tantri, aduh lope banyak banyak buat cewe gua deh pokoknya." }
    ]
       
for (let i = 0; i < programmerPatterns.length; i++) {
    if (programmerPatterns[i].pattern.test(messageLower)) {
        return programmerPatterns[i].response; // Jika ditemukan kecocokan, kembalikan respons
    }
}
}
// Fungsi untuk toggle chatbot
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

// Menangani event tekan tombol Enter untuk mengirim pesan
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Mencegah form submit
        sendMessage(); // Panggil fungsi untuk mengirim pesan
    }
});
