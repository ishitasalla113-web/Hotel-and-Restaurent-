const bookingData =
    JSON.parse(
        localStorage.getItem("grandVistaBooking")
    );


// ==========================================
// CHECK IF BOOKING EXISTS
// ==========================================

if (!bookingData) {

    window.location.href = "rooms.html";

}


// ==========================================
// DISPLAY BOOKING
// ==========================================

if (bookingData) {

    document.getElementById("bookingId")
        .textContent = bookingData.bookingId;


    document.getElementById("confirmName")
        .textContent = bookingData.name;


    document.getElementById("confirmRoom")
        .textContent = bookingData.room;


    document.getElementById("confirmGuests")
        .textContent =
            `${bookingData.guests} Guest${bookingData.guests > 1 ? "s" : ""}`;


    document.getElementById("confirmCheckIn")
        .textContent =
            formatDate(bookingData.checkIn);


    document.getElementById("confirmCheckOut")
        .textContent =
            formatDate(bookingData.checkOut);


    document.getElementById("confirmNights")
        .textContent =
            `${bookingData.nights} Night${bookingData.nights > 1 ? "s" : ""}`;


    document.getElementById("confirmTotal")
        .textContent =
            bookingData.total;

}


// ==========================================
// DATE FORMAT
// ==========================================

function formatDate(dateString) {

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}