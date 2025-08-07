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

      // Collect form values
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

      // STEP 1: Send to ADMIN
      emailjs.send("service_zrgl9u6", "template_oxascnk", templateParams)
        .then(() => {
          console.log("✅ Sent to admin");

          // STEP 2: Send confirmation to CLIENT
          return emailjs.send("service_zrgl9u6", "template_dz8u0x7", templateParams);
        })
        .then(() => {
          console.log("✅ Confirmation sent to client");
          alert("✅ Your message has been sent successfully!");
          form.reset();
        })
        .catch((error) => {
          console.error("❌ Failed to send message:", error);
          alert("❌ Failed to send message. Please try again later.");
        })
        .finally(() => {
          button.textContent = "Send Message";
          button.disabled = false;
        });
    });
  });
});
