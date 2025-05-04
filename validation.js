const form = document.getElementById("registerForm");
const inputs = form.querySelectorAll("input");
const submitBtn = document.getElementById("submitBtn");

const errors = {
  name: document.getElementById("nameError"),
  email: document.getElementById("emailError"),
  password: document.getElementById("passwordError"),
  confirmPassword: document.getElementById("confirmPasswordError"),
  phone: document.getElementById("phoneError")
};

function validate() {
  let valid = true;

  // Аты тек әріптер
  const name = form.name.value.trim();
  if (!/^[А-Яа-яA-Za-z]+$/.test(name)) {
    errors.name.textContent = "Тек әріптер енгізіңіз.";
    setErrorBorder("name");
    valid = false;
  } else {
    errors.name.textContent = "";
    removeErrorBorder("name");
  }

  // Email
  const email = form.email.value.trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email.textContent = "Email дұрыс емес.";
    setErrorBorder("email");
    valid = false;
  } else {
    errors.email.textContent = "";
    removeErrorBorder("email");
  }

  // Құпия сөз
  const password = form.password.value;
  const strength = getPasswordStrength(password);
  updateStrengthIndicator(strength);
  if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
    errors.password.textContent = "Кемінде 8 таңба, 1 цифр, 1 үлкен әріп болуы керек.";
    setErrorBorder("password");
    valid = false;
  } else {
    errors.password.textContent = "";
    removeErrorBorder("password");
  }

  // Құпия сөзді растау
  if (password !== form.confirmPassword.value) {
    errors.confirmPassword.textContent = "Құпия сөз сәйкес келмейді.";
    setErrorBorder("confirmPassword");
    valid = false;
  } else {
    errors.confirmPassword.textContent = "";
    removeErrorBorder("confirmPassword");
  }

  // Телефон
  const phone = form.phone.value;
  if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)) {
    errors.phone.textContent = "Телефон форматы: +7 (XXX) XXX-XX-XX";
    setErrorBorder("phone");
    valid = false;
  } else {
    errors.phone.textContent = "";
    removeErrorBorder("phone");
  }

  submitBtn.disabled = !valid;
}

function setErrorBorder(id) {
  form[id].classList.add("error-border");
}

function removeErrorBorder(id) {
  form[id].classList.remove("error-border");
}

function updateStrengthIndicator(strength) {
  const indicator = document.getElementById("strengthIndicator");
  indicator.className = "";
  if (strength === "weak") indicator.classList.add("weak");
  if (strength === "medium") indicator.classList.add("medium");
  if (strength === "strong") indicator.classList.add("strong");
}

function getPasswordStrength(pw) {
  if (pw.length < 8) return "weak";
  if (/(?=.*[A-Z])(?=.*\d)/.test(pw)) {
    if (pw.length >= 12) return "strong";
    return "medium";
  }
  return "weak";
}

inputs.forEach(input => input.addEventListener("input", validate));
form.addEventListener("submit", e => {
  e.preventDefault();
  alert("Тіркелу сәтті өтті!");
});