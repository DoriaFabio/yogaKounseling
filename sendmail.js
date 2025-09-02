const form = document.getElementById("myForm");  //Catturo il form con id 
const responseBox = document.getElementById("formResponse");  //Catturo la risposta al form (notifica) con id

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita il redirect
    const formData = new FormData(form);

    try {
        const res = await fetch("https://formspree.io/f/xyzdpnog", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            responseBox.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
                responseBox.classList.add("hidden");
            }, 3000);
            form.reset(); // Pulisce il form
        } else {
            alert("❌ Si è verificato un errore, riprova.");
        }
    } catch (err) {
        alert("⚠️ Errore di connessione, riprova più tardi.");
    }
});