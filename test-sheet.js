const url = "https://script.google.com/macros/s/AKfycbxR08lQduALnuRyyTHE_G61TG4dHTzvHRUl_EFmhLgCpvuGHGPEdAcpdhJF6OW7neyM/exec";

(async () => {
    try {
        console.log("Sending POST request to new URL...");
        const response = await fetch(url, {
            method: 'POST',
            redirect: "follow",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: "Test User From New Script",
                email: "test_new@example.com",
                phone: "0987654321",
                source: "Node fetch"
            })
        });

        console.log("Status:", response.status);
        const text = await response.text();
        console.log("Response:", text);
    } catch (e) {
        console.error("Fetch error:", e);
    }
})();
