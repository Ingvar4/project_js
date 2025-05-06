const form = document.getElementById('myForm');
const dataInputs = form.querySelectorAll('input, select');
const yearSelect = form.querySelector('#year');
const passwordInput = form.querySelector('#password');
const passwordErrorMessage = form.querySelector('#passwordError');

const currentYear = new Date().getFullYear();
for (let year = currentYear; year > currentYear - 40; year--) {
  const option = document.createElement('option');
  option.value = year;
  option.textContent = year;
  yearSelect.append(option);
};

dataInputs.forEach((dataInput, index) => {
  dataInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextIndex = (index + 1) % dataInputs.length;
      dataInputs[nextIndex].focus();
    }
  });
});

passwordInput.addEventListener('input', checkPasswordValidity);

function checkPasswordValidity() {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!passwordRegex.test(passwordInput.value)) {
    passwordErrorMessage.style.display = 'block';
  } else {
    passwordErrorMessage.style.display = 'none';
  }
};