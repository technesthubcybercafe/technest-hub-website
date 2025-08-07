document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".contact-form");

  // Initialize EmailJS
  emailjs.init("FL8CGm23lxwKi-ADg"); // Your Public Key

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const button = form.querySelector("button");
      button.textContent = "Sending...";
      button.disabled = true;

      const name = form.querySelector("input[placeholder='Your Name']").value.trim();
      const email = form.querySelector("input[placeholder='Your Email']").value.trim();
      const title = form.querySelector("input[placeholder='Subject']").value.trim();
      const message = form.querySelector("textarea").value.trim();
      const time = new Date().toLocaleString();

      // First: Send to admin
      emailjs
        .send("service_jqnnoo8", "template_oxascnk", {
          name: name,
          email: email,
          title: title,
          message: message,
          time: time
        })
        .then(() => {
          console.log("✅ Sent to Admin");

          // Second: Send to client
          return emailjs.send("service_jqnnoo8", "template_dz8u0x7", {
            name: name,
            email: email,
            title: title,
            message: message,
            time: time
          });
        })
        .then(() => {
          alert("✅ Your message has been sent successfully! Please check your email.");
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
