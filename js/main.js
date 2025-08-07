document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".contact-form");

  emailjs.init("FL8CGm23lxwKi-ADg"); // Public Key

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

      const templateParams = { name, email, title, message, time };

      emailjs.send("service_jqnnoo8", "template_oxascnk", templateParams)
        .then(() => emailjs.send("service_jqnnoo8", "template_dz8u0x7", templateParams))
        .then(() => {
          alert("✅ Your message has been sent successfully!");
          form.reset();
        })
        .catch((error) => {
          console.error("❌ EmailJS Error:", error);
          alert(`❌ Failed to send message: ${error.text || error}`);
        })
        .finally(() => {
          button.textContent = "Send Message";
          button.disabled = false;
        });
    });
  });
});
