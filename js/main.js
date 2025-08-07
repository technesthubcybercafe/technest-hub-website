document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".contact-form");

  // Initialize EmailJS
  emailjs.init("FL8CGm23lxwKi-ADg");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const button = form.querySelector("button");
      button.textContent = "Sending...";
      button.disabled = true;

      // Get form values
      const name = form.querySelector("input[placeholder='Your Name']").value.trim();
      const email = form.querySelector("input[placeholder='Your Email']").value.trim();
      const title = form.querySelector("input[placeholder='Subject']").value.trim();
      const message = form.querySelector("textarea").value.trim();
      const time = new Date().toLocaleString();

      const formData = { name, email, title, message, time };

      // Step 1: Send to Admin
      emailjs.send("service_jqnnoo8", "template_oxascnk", formData)
        .then(() => {
          console.log("✅ Sent to Admin");

          // Step 2: Send Auto-Reply to Client
          return emailjs.send("service_jqnnoo8", "template_dz8u0x7", formData);
        })
        .then(() => {
          alert("✅ Your message was sent successfully! Check your email for confirmation.");
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
