// Ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".contact-form");

  // Initialize EmailJS
  emailjs.init("z7pQL2vENnZviURte");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = form.querySelector("input[placeholder='Your Name']");
      const emailInput = form.querySelector("input[placeholder='Your Email']");
      const titleInput = form.querySelector("input[placeholder='Subject']");
      const messageInput = form.querySelector("textarea");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const title = titleInput.value.trim();
      const message = messageInput.value.trim();
      const time = new Date().toLocaleString();

      // Simple validation
      if (!name || !email || !title || !message) {
        alert("⚠️ Please fill in all fields.");
        return;
      }

      const button = form.querySelector("button");
      button.textContent = "Sending...";
      button.disabled = true;

      // Email to Admin
      const adminParams = {
        name,
        email,
        title,
        message,
        time,
      };

      // Email to Client
      const clientParams = {
        name,
        email,
        title,
        message,
        time,
      };

      // Send to Admin
      emailjs
        .send("service_zrgl9u6", "template_oxascnk", adminParams)
        .then(() => {
          // Send thank you email to client
          return emailjs.send("service_zrgl9u6", "template_dz8u0x7", clientParams);
        })
        .then(() => {
          alert("✅ Message sent! A mail has been sent to your inbox.");
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          alert("❌ Failed to send message. Please try again later.");
        })
        .finally(() => {
          button.textContent = "Send Message";
          button.disabled = false;
        });
    });
  });
});
