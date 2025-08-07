document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".contact-form");

  emailjs.init("z7pQL2vENnZviURte"); // Use your actual Public Key

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const button = form.querySelector("button");
      const name = form.querySelector("input[placeholder='Your Name']").value.trim();
      const email = form.querySelector("input[placeholder='Your Email']").value.trim();
      const title = form.querySelector("input[placeholder='Subject']").value.trim();
      const message = form.querySelector("textarea").value.trim();
      const time = new Date().toLocaleString();

      if (!name || !email || !title || !message) {
        alert("⚠️ Please fill in all fields.");
        return;
      }

      button.textContent = "Sending...";
      button.disabled = true;

      emailjs.send("service_zrgl9u6", "template_oxascnk", {
        name,
        email,
        title,
        message,
        time,
      })
      .then(() => {
        form.reset();
        // Message sent silently
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
