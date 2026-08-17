const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class
        button.classList.add("active");

        const filter = button.dataset.filter;

        menuCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || category === filter) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


// ==========================================
// RESTAURANT RESERVATION
// ==========================================

const restaurantForm =
    document.getElementById("restaurantBookingForm");

const restaurantDate =
    document.getElementById("restaurantDate");


// Prevent selecting past dates

const today = new Date().toISOString().split("T")[0];

if (restaurantDate) {
    restaurantDate.min = today;
}


// Form submission

if (restaurantForm) {

    restaurantForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("guestName").value.trim();

        const guests =
            document.getElementById("guestCount").value;

        const date =
            document.getElementById("restaurantDate").value;

        const time =
            document.getElementById("restaurantTime").value;


        if (!name || !date || !time) {

            alert("Please complete all reservation details.");

            return;
        }


        alert(
            `Thank you, ${name}!

Your table request has been received.

Guests: ${guests}
Date: ${date}
Time: ${time}`
        );


        restaurantForm.reset();

    });

}