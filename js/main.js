document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  emailjs.init("FL8CGm23lxwKi-ADg"); // Your Public Key

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const button = form.querySelector("button");
    button.textContent = "Sending...";
    button.disabled = true;

    const templateParams = {
      name: form.querySelector("input[placeholder='Your Name']").value.trim(),
      email: form.querySelector("input[placeholder='Your Email']").value.trim(),
      title: form.querySelector("input[placeholder='Subject']").value.trim(),
      message: form.querySelector("textarea").value.trim(),
      time: new Date().toLocaleString()
    };

    // Send to Admin
    emailjs.send("service_jqnnoo8", "template_oxascnk", templateParams)
      .then(() => {
        console.log("✅ Sent to Admin");

        // Send Auto-reply to Client
        return emailjs.send("service_jqnnoo8", "template_dz8u0x7", templateParams);
      })
      .then(() => {
        alert("✅ Your message has been sent successfully! Please check your email.");
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
