// Ensure DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".contact-form");

  // Initialize EmailJS with your Public Key
  emailjs.init("FL8CGm23lxwKi-ADg");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      const button = form.querySelector("button");
      button.textContent = "Sending...";
      button.disabled = true;

      // Get form values
      const name = form.querySelector("input[placeholder='Your Name']").value.trim();
      const email = form.querySelector("input[placeholder='Your Email']").value.trim();
      const title = form.querySelector("input[placeholder='Subject']").value.trim();
      const message = form.querySelector("textarea").value.trim();
      const time = new Date().toLocaleString();

      // Data object for EmailJS
      const templateParams = {
        name: name,
        email: email,
        title: title,
        message: message,
        time: time
      };

      // 1️⃣ Send to Admin
      emailjs
        .send("service_jqnnoo8", "template_oxascnk", templateParams)
        .then(() => {
          console.log("✅ Message sent to admin");
        })
        .catch((error) => {
          console.error("❌ Error sending to admin:", error);
        });

      // 2️⃣ Send Auto-reply to Client
      emailjs
        .send("service_jqnnoo8", "template_dz8u0x7", templateParams)
        .then(() => {
          console.log("✅ Auto-reply sent to client");
          alert("✅ Your message has been sent! Check your email for confirmation.");
          form.reset();
        })
        .catch((error) => {
          console.error("❌ Error sending auto-reply:", error);
          alert("❌ Failed to send auto-reply. Please try again later.");
        })
        .finally(() => {
          button.textContent = "Send Message";
          button.disabled = false;
        });
    });
  });
});
