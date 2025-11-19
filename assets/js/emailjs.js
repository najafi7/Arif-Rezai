/*
 EmailJS integration for the contact form in `index.html`.

 Setup (replace placeholders below):
 - Create an EmailJS account at https://www.emailjs.com/
 - Add an email service (e.g., Gmail, SMTP) and note its Service ID (e.g. 'service_xxx')
 - Create an email template and note its Template ID (e.g. 'template_xxx').
   The template should use variables: `user_name`, `user_email`, `message`, and optionally `to_email`.
 - Obtain your Public Key from EmailJS (Dashboard > Integration) and replace `YOUR_PUBLIC_KEY`.

 Replace the placeholders `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY` below.
 The code will send an email to `to_email` (we set `ariflomo3430@gmail.com` by default in params),
 but your EmailJS template controls the final email content and recipients.
*/

document.addEventListener('DOMContentLoaded', function () {
  // Initialize EmailJS (replace with your public key)
  if (window.emailjs && typeof emailjs.init === 'function') {
    emailjs.init('YOUR_PUBLIC_KEY'); // <-- REPLACE with your EmailJS Public Key
  }

  var form = document.getElementById('contact-form');
  var alertBox = document.getElementById('form-alert');
  var submitBtn = document.getElementById('contact-submit');

  function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = 'form-alert ' + (type === 'error' ? 'error' : 'success');
    alertBox.style.display = 'block';
    // auto-hide after 8s
    setTimeout(function () { alertBox.style.display = 'none'; }, 8000);
  }

  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = (document.getElementById('user_name') || {}).value || '';
    var email = (document.getElementById('user_email') || {}).value || '';
    var message = (document.getElementById('message') || {}).value || '';

    name = name.trim();
    email = email.trim();
    message = message.trim();

    if (!name) { showAlert('Please enter your name.', 'error'); return; }
    if (!email || !validateEmail(email)) { showAlert('Please enter a valid email address.', 'error'); return; }
    if (!message) { showAlert('Please enter a message.', 'error'); return; }

    // UI feedback
    submitBtn.disabled = true;
    var origText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';

    var serviceID = 'YOUR_SERVICE_ID'; // <-- REPLACE
    var templateID = 'YOUR_TEMPLATE_ID'; // <-- REPLACE

    var templateParams = {
      user_name: name,
      user_email: email,
      message: message,
      to_email: 'ariflomo3430@gmail.com'
    };

    emailjs.send(serviceID, templateID, templateParams)
      .then(function (response) {
        showAlert('Message sent successfully. Thank you!', 'success');
        form.reset();
      }, function (error) {
        console.error('EmailJS error:', error);
        showAlert('An error occurred while sending. Please try again later.', 'error');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
      });
  });
});
