document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".contact-form");

  // Initialize EmailJS
  emailjs.init("FL8CGm23lxwKi-ADg"); // your public key

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const button = form.querySelector("button");
      button.textContent = "Sending...";
      button.disabled = true;

      // Get values directly from input names
      const name = form.querySelector("input[name='name']").value.trim();
      const email = form.querySelector("input[name='email']").value.trim();
      const title = form.querySelector("input[name='title']").value.trim();
      const message = form.querySelector("textarea[name='message']").value.trim();
      const time = new Date().toLocaleString();

      // Params for EmailJS
      const params = {
        name: name,
        email: email,
        title: title,
        message: message,
        time: time
      };

      // 1️⃣ Send to Admin
      emailjs.send("service_jqnnoo8", "contact_to_admin", params)
        .then(() => {
          console.log("✅ Sent to admin");

          // 2️⃣ Send to Client after admin email succeeds
          return emailjs.send("service_jqnnoo8", "contact_to_client", params);
        })
        .then(() => {
          console.log("✅ Sent confirmation to client");
          alert("✅ Your message has been sent successfully!");
          form.reset();
        })
        .catch((error) => {
          console.error("❌ EmailJS Error:", error);
          alert("❌ Failed to send message. Please try again later.");
        })
        .finally(() => {
          button.textContent = "Send Message";
          button.disabled = false;
        });
    });
  });
});
