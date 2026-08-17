
// ==========================================
// ROOM IMAGE GALLERY
// ==========================================

const galleryThumbs = document.querySelectorAll(".gallery-thumbs img");

galleryThumbs.forEach(thumb => {

    thumb.addEventListener("click", () => {

        const gallery = thumb.closest(".room-gallery");

        if (!gallery) {
            return;
        }

        const mainImage = gallery.querySelector(":scope > img");

        if (mainImage) {
            mainImage.src = thumb.src;
        }

    });

});


// ==========================================
// DETAILS MODAL
// ==========================================

const detailsModal = document.getElementById("detailsModal");
const detailsClose = document.getElementById("detailsClose");
const detailsRoomName = document.getElementById("detailsRoomName");
const detailsText = document.getElementById("detailsText");


const roomDescriptions = {

    "Deluxe Room":
        "Our Deluxe Room combines elegant design with modern comfort. Enjoy a peaceful retreat with premium bedding, complimentary breakfast, high-speed WiFi, room service and daily housekeeping.",

    "Executive Suite":
        "The Executive Suite provides additional living space and premium amenities. It is ideal for business travelers, couples and guests looking for extra comfort.",

    "Presidential Suite":
        "The Presidential Suite is our most luxurious accommodation, offering generous living space, panoramic city views, premium bathroom amenities and personalized service."

};


document.querySelectorAll(".details-btn").forEach(button => {

    button.addEventListener("click", () => {

        const room = button.dataset.room;

        if (detailsRoomName) {
            detailsRoomName.textContent = room;
        }

        if (detailsText) {
            detailsText.textContent =
                roomDescriptions[room] ||
                "Experience exceptional comfort at Grand Vista.";
        }

        if (detailsModal) {
            detailsModal.classList.add("active");
        }

    });

});


if (detailsClose && detailsModal) {

    detailsClose.addEventListener("click", () => {
        detailsModal.classList.remove("active");
    });

}


// ==========================================
// BOOKING MODAL
// ==========================================

const bookingModal = document.getElementById("bookingModal");
const bookingClose = document.getElementById("bookingClose");
const selectedRoom = document.getElementById("selectedRoom");
const bookingPrice = document.getElementById("bookingPrice");
const openBookingBtn = document.getElementById("openBookingBtn");


// Default room price
let selectedRoomPrice = 149;


// ==========================================
// ROOM BOOKING BUTTONS
// ==========================================

document.querySelectorAll(".book-room-btn").forEach(button => {

    button.addEventListener("click", () => {

        const room = button.dataset.room;
        const price = button.dataset.price;

        if (selectedRoom) {
            selectedRoom.textContent = room;
        }

        if (bookingPrice) {
            bookingPrice.textContent = price;
        }

        selectedRoomPrice = Number(price);

        if (bookingModal) {
            bookingModal.classList.add("active");
        }

    });

});


// ==========================================
// CTA BOOKING BUTTON
// ==========================================

if (openBookingBtn && bookingModal) {

    openBookingBtn.addEventListener("click", () => {

        if (selectedRoom) {
            selectedRoom.textContent = "Deluxe Room";
        }

        if (bookingPrice) {
            bookingPrice.textContent = "149";
        }

        selectedRoomPrice = 149;

        bookingModal.classList.add("active");

    });

}


// ==========================================
// CLOSE BOOKING MODAL
// ==========================================

if (bookingClose && bookingModal) {

    bookingClose.addEventListener("click", () => {
        bookingModal.classList.remove("active");
    });

}


// ==========================================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// ==========================================

window.addEventListener("click", event => {

    if (
        detailsModal &&
        event.target === detailsModal
    ) {
        detailsModal.classList.remove("active");
    }

    if (
        bookingModal &&
        event.target === bookingModal
    ) {
        bookingModal.classList.remove("active");
    }

});


// ==========================================
// BOOKING DATES
// ==========================================

const checkIn = document.getElementById("roomCheckIn");
const checkOut = document.getElementById("roomCheckOut");


// Get today's date
const today = new Date().toISOString().split("T")[0];


// Set minimum check-in date
if (checkIn) {
    checkIn.min = today;
}


// Set minimum check-out date
if (checkOut) {
    checkOut.min = today;
}


// Update checkout date when check-in changes
if (checkIn && checkOut) {

    checkIn.addEventListener("change", () => {

        checkOut.min = checkIn.value;

        if (
            checkOut.value &&
            checkOut.value <= checkIn.value
        ) {
            checkOut.value = "";
        }

    });

}


// ==========================================
// BOOKING FORM
// ==========================================

const roomBookingForm =
    document.getElementById("roomBookingForm");


if (roomBookingForm) {

    roomBookingForm.addEventListener("submit", event => {

        event.preventDefault();


        // ======================================
        // GET FORM VALUES
        // ======================================

        const nameInput =
            document.getElementById("bookingName");

        const emailInput =
            document.getElementById("bookingEmail");

        const guestsInput =
            document.getElementById("roomGuests");


        const name =
            nameInput
                ? nameInput.value.trim()
                : "";

        const email =
            emailInput
                ? emailInput.value.trim()
                : "";

        const checkInDate =
            checkIn
                ? checkIn.value
                : "";

        const checkOutDate =
            checkOut
                ? checkOut.value
                : "";

        const guests =
            guestsInput
                ? guestsInput.value
                : "1";


        // ======================================
        // VALIDATION
        // ======================================

        if (
            !name ||
            !email ||
            !checkInDate ||
            !checkOutDate
        ) {

            alert(
                "Please complete all booking details."
            );

            return;
        }


        // ======================================
        // CHECK DATES
        // ======================================

        if (checkOutDate <= checkInDate) {

            alert(
                "Check-out date must be after check-in date."
            );

            return;
        }


        // ======================================
        // CALCULATE NIGHTS
        // ======================================

        const start =
            new Date(checkInDate + "T00:00:00");

        const end =
            new Date(checkOutDate + "T00:00:00");

        const difference =
            end - start;


        const nights =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );


        // ======================================
        // CALCULATE TOTAL
        // ======================================

        const total =
            nights * selectedRoomPrice;


        // ======================================
        // CREATE BOOKING ID
        // ======================================

        const bookingId =
            "GV-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        // ======================================
        // CREATE BOOKING DATA
        // ======================================

        const bookingData = {

            bookingId: bookingId,

            name: name,

            email: email,

            room:
                selectedRoom
                    ? selectedRoom.textContent
                    : "Deluxe Room",

            pricePerNight:
                selectedRoomPrice,

            guests:
                Number(guests),

            checkIn:
                checkInDate,

            checkOut:
                checkOutDate,

            nights:
                nights,

            total:
                total

        };


        // ======================================
        // SAVE BOOKING
        // ======================================

        localStorage.setItem(
            "grandVistaBooking",
            JSON.stringify(bookingData)
        );


        // ======================================
        // GO TO CONFIRMATION PAGE
        // ======================================

        window.location.href =
            "booking-confirmation.html";

    });

}
