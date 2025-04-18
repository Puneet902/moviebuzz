document.addEventListener("DOMContentLoaded", function() {
    const seatContainer = document.getElementById("seatContainer");
    const selectedSeatsDisplay = document.getElementById("selectedSeats");
    const totalPriceDisplay = document.getElementById("totalPrice");

    const ticketRow = document.getElementById("row");
    const ticketSeats = document.getElementById("seat");
    const ticketPrice = document.getElementById("price");
    const ticketDate = document.getElementById("date");
    const ticketTime = document.getElementById("time");
    const ticketScreen = document.getElementById("screen");

    let selectedSeats = [];

    function createSeats(rowsData) {
        rowsData.forEach(row => {
            let rowElement = document.createElement("div");
            rowElement.classList.add("row");
            let rowLabel = document.createElement("span");
            rowLabel.textContent = row.name;
            rowElement.appendChild(rowLabel);

            let seatGroup = document.createElement("div");
            seatGroup.classList.add("seats");

            row.seats.forEach(seatId => {
                let seat = document.createElement("div");
                seat.classList.add("seat");
                seat.textContent = seatId;
                seat.dataset.id = seatId;
                seat.dataset.row = row.name;
                seat.dataset.price = row.price;
                seat.classList.add(row.type);

                if (row.soldSeats.includes(seatId)) {
                    seat.classList.add("sold");
                } else {
                    seat.addEventListener("click", function() {
                        let seatInfo = { row: row.name, seat: seatId, price: row.price };

                        if (seat.classList.contains("selected")) {
                            seat.classList.remove("selected");
                            selectedSeats = selectedSeats.filter(s => s.seat !== seatId);
                        } else {
                            seat.classList.add("selected");
                            selectedSeats.push(seatInfo);
                        }

                        updateTicketDetails();
                    });
                }
                seatGroup.appendChild(seat);
            });
            rowElement.appendChild(seatGroup);
            seatContainer.appendChild(rowElement);
        });
    }

    function updateTicketDetails() {
        if (selectedSeats.length === 0) {
            selectedSeatsDisplay.textContent = "None";
            ticketSeats.textContent = '" "';
            ticketRow.textContent = '" "';
            ticketPrice.textContent = '" "';
            return;
        }

        // Group seats by row
        let groupedSeats = {};
        selectedSeats.forEach(s => {
            if (!groupedSeats[s.row]) {
                groupedSeats[s.row] = [];
            }
            groupedSeats[s.row].push(s.seat);
        });

        let seatDetails = Object.entries(groupedSeats)
            .map(([row, seats]) => `${row}: ${seats.join(", ")}`)
            .join("\n"); // New line between rows

        let totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

        // Update UI
        selectedSeatsDisplay.innerText = seatDetails;
        totalPriceDisplay.textContent = `Rs. ${totalPrice}`;

        ticketScreen.textContent = "1"; // Default screen
        ticketDate.textContent = selectedDate ? selectedDate.toDateString() : "Select Date";
        ticketTime.textContent = selectedTime ? selectedTime : "Select Time";
        ticketRow.innerText = Object.keys(groupedSeats).join(", "); // Show rows
        ticketSeats.innerText = seatDetails; // Show grouped seat details
        ticketPrice.textContent = `Rs. ${totalPrice}`;
    }

    const rows = [
        { name: "A", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9], price: 180, type: "classic", soldSeats: [] },
        { name: "B", seats: [10, 11, 12, 13, 14, 15, 16, 17, 18], price: 180, type: "classic", soldSeats: [] },
        { name: "C", seats: [19, 20, 21, 22, 23, 24], price: 180, type: "classic", soldSeats: [] },
        { name: "D", seats: [25, 26, 27, 28, 29, 30], price: 180, type: "classic", soldSeats: [] },
        { name: "E", seats: [31, 32, 33, 34, 35, 36], price: 180, type: "classic", soldSeats: [] },
        { name: "F", seats: [37, 38, 39, 40, 41, 42], price: 180, type: "classic", soldSeats: [] },
        { name: "G", seats: [43, 44, 45, 46, 47, 48, 49, 50], price: 200, type: "prime", soldSeats: [] },
        { name: "H", seats: [51, 52, 53, 54, 55, 56, 57, 58], price: 200, type: "prime", soldSeats: [] },
        { name: "I", seats: [59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72], price: 200, type: "prime", soldSeats: [] },
        { name: "J", seats: [73, 74, 75, 76, 77, 78, 79, 80], price: 200, type: "prime", soldSeats: [] },
        { name: "K", seats: [81, 82, 83, 84, 85, 86, 87, 88], price: 350, type: "recliner", soldSeats: [] },
        { name: "L", seats: [89, 90, 91, 92, 93, 94, 95, 96], price: 350, type: "recliner", soldSeats: [] },
        { name: "M", seats: [97, 98, 99, 100, 101, 102, 103, 104], price: 350, type: "recliner", soldSeats: [] },
        { name: "N", seats: [105, 106, 107, 108, 109, 110, 111, 112], price: 350, type: "recliner", soldSeats: [] },
        { name: "O", seats: [113, 114, 115, 116, 117, 118, 119, 120], price: 350, type: "recliner", soldSeats: [] },
        { name: "P", seats: [121, 122, 123, 124, 125, 126, 127, 128, 129, 130], price: 350, type: "recliner", soldSeats: [] }
    ];

    createSeats(rows);
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
function book() { 
    let confirmBooking = confirm("Press OK to confirm your booking");

    if (confirmBooking) {
        const screen = document.getElementById("screen").textContent.trim();
        const row = document.getElementById("row").textContent.trim();
        const seat = document.getElementById("seat").textContent.trim();
        const price = document.getElementById("price").textContent.replace("Rs.", "").trim();
        const date = document.getElementById("date").textContent.trim();
        const time = document.getElementById("time").textContent.trim();

        // ✅ Get movie details from the movie-title class (first one found or add logic to pick selected)
        const movieElement = document.querySelector(".movie-title");
        const movieName = movieElement ? movieElement.textContent.trim() : "Unknown Movie";
        const category = movieElement ? movieElement.getAttribute("data-category") : "uncategorized";

        if (!seat || !row || !price || !date || !time) {
            alert("Please select a seat and time before booking.");
            return;
        }

        fetch('http://localhost:3008/save-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: 1,
                movie_name: movieName,
                seat_number: seat,
                total_amount: parseInt(price),
                show_time: time,
                show_date: date,
                category: category
            }),
        })
        
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showPaymentPopup();
                document.getElementById("download").style.display = "inline";
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.error("Booking error:", err);
        });
    }
}

function showPaymentPopup() {
    const popup = document.createElement("div");
    popup.innerHTML = `
        <div style="
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: black;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(247, 245, 245, 0.3);
            text-align: center;
            z-index: 9999;
        ">
            <h3 style="margin-bottom: 15px;">✅ Payment Successful</h3>
            <p>Your ticket has been booked.</p>
            <button onclick="this.parentElement.remove()">OK</button>
        </div>
    `;
    document.body.appendChild(popup);
}


  

  


function generatePDF() {
    const { jsPDF } = window.jspdf; // Import jsPDF
    let ticketElement = document.querySelector(".ticket"); // Select Ticket Section

    html2canvas(ticketElement, { scale: 2 }).then(canvas => {
        let imgData = canvas.toDataURL("image/png"); // Convert Ticket to Image
        let doc = new jsPDF('p', 'mm', 'a4'); // Create PDF (Portrait, Millimeters, A4)

        let imgWidth = 190; // Image Width in mm (A4 width - margins)
        let imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale Image Proportionally

        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); // Add Image to PDF

        // Convert the PDF to a Base64 string
        let pdfBase64 = doc.output('datauristring');

        // Send the Base64 string to the server to email it
        fetch('/send-ticket-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pdfBase64 })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Log success message
        })
        .catch(error => {
            console.error('Error sending PDF to server:', error);
        });
    });
}


function generatePDFAndSendEmail() {
    const { jsPDF } = window.jspdf; 
    let ticketElement = document.querySelector(".ticket"); 

    html2canvas(ticketElement, { scale: 2 }).then(canvas => {
        let imgData = canvas.toDataURL("image/png"); 
        let doc = new jsPDF('p', 'mm', 'a4'); 

        let imgWidth = 190; 
        let imgHeight = (canvas.height * imgWidth) / canvas.width; 

        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); 

        let pdfBase64 = doc.output('datauristring');

        // Fetch the most recent user's email
        fetch('http://localhost:3008/get-latest-user-email')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Send the Base64 string to the server to email it
                    fetch('/send-ticket-pdf', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: data.email, // Get the email from the response
                            pdfBase64: pdfBase64
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message); // Log success message
                    })
                    .catch(error => {
                        console.error('Error sending PDF to server:', error);
                    });
                } else {
                    console.error('Failed to fetch user email');
                }
            })
            .catch(error => {
                console.error('Error fetching user email:', error);
            });
    });
}
