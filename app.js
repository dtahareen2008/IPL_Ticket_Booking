
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

function scrollToBooking() {
    document.getElementById("bookingForm").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Taking you to the booking form!");
}

document.addEventListener("DOMContentLoaded", function () {

    // Activity 7: Live Booking Summary
    const matchSelect = document.getElementById("matchSelect");
    const standSelect = document.getElementById("standSelect");
    const ticketQuantity = document.getElementById("ticketQuantity");

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const totalAmount = document.getElementById("totalAmount");

    const prices = {
        General: 1000,
        Premium: 3000,
        VIP: 6000
    };

    function updateBookingSummary() {
        const match = matchSelect.value;
        const stand = standSelect.value;
        const quantity = Number(ticketQuantity.value) || 0;
        const price = prices[stand] || 0;
        const total = price * quantity;

        summaryMatch.textContent = match || "-";
        summaryStand.textContent = stand || "-";
        summaryPrice.textContent = "₹" + price;
        summaryQuantity.textContent = quantity;
        totalAmount.textContent = "₹" + total;
    }

    matchSelect.addEventListener("change", updateBookingSummary);
    standSelect.addEventListener("change", updateBookingSummary);
    ticketQuantity.addEventListener("input", updateBookingSummary);

    updateBookingSummary();

    // Booking Form
    const bookingForm = document.getElementById("bookingForm");

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateBookingSummary();
        showToast("Booking submitted successfully!");
    });

    // Activity 8: Mobile Hamburger Menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Activity 8: Team Filter
    const teamFilter = document.getElementById("teamFilter");
    const matchCards = document.querySelectorAll(".match-card");

    if (teamFilter) {
        teamFilter.addEventListener("change", function () {
            const selectedTeam = teamFilter.value;

            matchCards.forEach(function (card) {
                const teams = card.getAttribute("data-team").split(" ");

                card.style.display =
                    selectedTeam === "all" || teams.includes(selectedTeam)
                        ? ""
                        : "none";
            });
        });
    }

    // Activity 8: Grid and List View
    const matchContainer = document.getElementById("matchContainer");
    const gridViewBtn = document.getElementById("gridViewBtn");
    const listViewBtn = document.getElementById("listViewBtn");

    if (matchContainer && gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener("click", function () {
            matchContainer.classList.remove("list-view");
            showToast("Grid View Enabled!");
        });

        listViewBtn.addEventListener("click", function () {
            matchContainer.classList.add("list-view");
            showToast("List View Enabled!");
        });
    }
});
