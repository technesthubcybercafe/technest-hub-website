document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  // Init EmailJS with your Public Key
  emailjs.init("FL8CGm23lxwKi-ADg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Set time value in hidden input
    form.time.value = new Date().toLocaleString();

    const button = form.querySelector("button");
    button.textContent = "Sending...";
    button.disabled = true;

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      title: form.title.value.trim(),
      message: form.message.value.trim(),
      time: form.time.value
    };

    // 1️⃣ Send to Admin
    emailjs.send("service_jqnnoo8", "contact_to_admin", formData)
      .then(() => {
        console.log("✅ Admin email sent");

        // 2️⃣ Send to Client
        return emailjs.send("service_jqnnoo8", "contact_to_client", formData);
      })
      .then(() => {
        console.log("✅ Client email sent");
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
