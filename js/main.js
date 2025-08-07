document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".contact-form");

  // Initialize EmailJS with your Public Key
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

      const templateParams = {
        name: name,
        email: email,
        title: title,
        message: message,
        time: time
      };

      // 1️⃣ Send to Admin
      emailjs
        .send("service_jqnnoo8", "contact_to_admin", templateParams)
        .then(() => {
          console.log("✅ Message sent to Admin");

          // 2️⃣ Send to Client
          return emailjs.send("service_jqnnoo8", "contact_to_client", templateParams);
        })
        .then(() => {
          alert("✅ Your message has been sent successfully!");
          form.reset();
        })
        .catch((error) => {
          console.error("❌ EmailJS Error:", error);
          alert("Failed to send message. Please try again later.");
        })
        .finally(() => {
          button.textContent = "Send Message";
          button.disabled = false;
        });
    });
  });
});
