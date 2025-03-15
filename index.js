document.querySelector('.sign-in').addEventListener('click', function() {
    alert('Sign-in functionality coming soon!');
});

// Movie Filtering Logic
const categoryButtons = document.querySelectorAll('.category-btn');
const movies = document.querySelectorAll('.movie');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');

        movies.forEach(movie => {
            if (category === "all" || movie.getAttribute('data-category') === category) {
                movie.style.display = "block";
            } else {
                movie.style.display = "none";
            }
        });
    });
});

// Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const menuDropdown = document.querySelector('.menu-dropdown');

menuBtn.addEventListener('click', () => {
    menuDropdown.style.display = menuDropdown.style.display === "block" ? "none" : "block";
});

// Hide menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
        menuDropdown.style.display = "none";
    }
});
function toggleChatbot() {
    let chatbot = document.getElementById("chatbot");
    chatbot.classList.toggle("hidden");
}

function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value.trim();
    if (message === "") return;

    let chatBody = document.getElementById("chat-body");
    let userMessage = `<div style='text-align: right; margin: 5px;'><strong>You:</strong> ${message}</div>`;
    chatBody.innerHTML += userMessage;
    input.value = "";
    
    setTimeout(() => {
        let botReply = `<div style='text-align: left; margin: 5px;'><strong>Bot:</strong> ${generateReply(message)}</div>`;
        chatBody.innerHTML += botReply;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
}

function generateReply(message) {
    const replies = {
        "hello": "Hi there! How can I help you?",
        "how are you": "I'm just a bot, but I'm doing great!",
        "bye": "Goodbye! Have a great day!"
    };
    
    return replies[message.toLowerCase()] || "I'm not sure how to respond to that.";
}
function scrollMovies(direction) {
    const movieList = document.getElementById("movieList");
    const scrollAmount = 220; // Adjust for smooth scrolling
    movieList.scrollLeft += direction * scrollAmount;
}
