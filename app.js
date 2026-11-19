
// Activity 4: Reusable Toast Notification Function
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = "show";

    setTimeout(function () {
        toast.className = "";
    }, 3000);
}


// Activity 4: Smooth Scrolling to Booking Form
function scrollToBooking() {
    const bookingSection = document.getElementById("booking");

    if (bookingSection) {
        bookingSection.scrollIntoView({
            behavior: "smooth"
        });

        showToast("Taking you to the booking form!");
    }
}


// Activity 7: Live Booking Summary
document.addEventListener("DOMContentLoaded", function () {

    // Select booking form elements
    const matchSelect = document.getElementById("matchSelect");
    const standSelect = document.getElementById("standSelect");
    const ticketQuantity = document.getElementById("ticketQuantity");

    // Select summary elements
    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const totalAmount = document.getElementById("totalAmount");

    // Ticket prices
    const ticketPrices = {
        "CSK vs RCB": {
            "General": 1000,
            "Premium": 2500,
            "VIP": 5000
        },

        "MI vs KKR": {
            "General": 1200,
            "Premium": 3000,
            "VIP": 6000
        }
    };

    // Update Booking Summary Function
    function updateBookingSummary() {

        const selectedMatch = matchSelect.value;
        const selectedStand = standSelect.value;

        let quantity = parseInt(ticketQuantity.value);

        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
            ticketQuantity.value = 1;
        }

        // Get ticket price
        const price = ticketPrices[selectedMatch][selectedStand];

        // Calculate total amount
        const total = price * quantity;

        // Display selected details
        summaryMatch.textContent = selectedMatch;
        summaryStand.textContent = selectedStand;
        summaryPrice.textContent = price;
        summaryQuantity.textContent = quantity;
        totalAmount.textContent = total;

        showToast("Booking Summary Updated!");
    }

    // Add change event listeners
    matchSelect.addEventListener("change", updateBookingSummary);

    standSelect.addEventListener("change", updateBookingSummary);

    ticketQuantity.addEventListener("change", updateBookingSummary);

    // Form submission
    document.querySelector("#bookingForm").addEventListener("submit", function(event) {
        event.preventDefault();
        showToast("Please review your booking summary!");
    });

});
