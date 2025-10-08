const form = document.getElementById("myForm");
const responseBox = document.getElementById("formResponse");
const responseError = document.getElementById("formResponseError");
const formNotConnection =  document.getElementById("formNotConnection");
const formName = document.getElementById("name");
const messageName = document.getElementById("messageName");
let timeoutId;

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Controllo GDPR
    const consent = document.getElementById('privacyConsent');
    if (!consent.checked) {
        alert("Devi accettare la Privacy Policy per inviare il messaggio.");
        return;
    }

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
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                responseBox.classList.add("hidden");
            }, 3000);
            form.reset();
        } else {
            responseError.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: "smooth" });
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                responseError.classList.add("hidden");
            }, 3000);
            form.reset();
        }
    } catch (err) {
        formNotConnection.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            formNotConnection.classList.add("hidden");
        }, 3000);
        form.reset();
    }
});

