// Elements
const passwordInput = document.getElementById('passwordInput');
const strengthMeterFill = document.getElementById('strengthMeterFill');
const strengthText = document.getElementById('strengthText');
const togglePassword = document.getElementById('togglePassword');
const charCount = document.getElementById('charCount');

// Requirement elements
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqLowercase = document.getElementById('req-lowercase');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');


// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePassword.querySelector('.eye-icon').textContent = isHidden ? '🙈' : '👁️';
});


// Password input listener
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    charCount.textContent = `${password.length} character${password.length === 1 ? '' : 's'}`;

    if (password.length === 0) {
        resetStrength();
        return;
    }

    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    // Update checklist
    updateRequirement(reqLength, checks.length);
    updateRequirement(reqUppercase, checks.uppercase);
    updateRequirement(reqLowercase, checks.lowercase);
    updateRequirement(reqNumber, checks.number);
    updateRequirement(reqSpecial, checks.special);

    const passedChecks = Object.values(checks).filter(Boolean).length;
    updateStrengthMeter(passedChecks);
});


// Update requirement indicator
function updateRequirement(element, isMet) {
    element.classList.toggle('met', isMet);
}


// Update strength meter + text
function updateStrengthMeter(passed) {
    let strength = 'Weak';
    let width = '33%';
    let color = '#ef4444';

    if (passed <= 2) {
        strength = 'Weak';
        width = '33%';
        color = '#ef4444';
    } else if (passed <= 4) {
        strength = 'Medium';
        width = '66%';
        color = '#f97316';
    } else {
        strength = 'Strong';
        width = '100%';
        color = '#22c55e';
    }

    strengthMeterFill.style.width = width;
    strengthMeterFill.style.backgroundColor = color;
    strengthText.textContent = strength;
}


// Reset UI
function resetStrength() {
    strengthMeterFill.style.width = '0%';
    strengthText.textContent = 'Enter a password to check its strength';
    charCount.textContent = '0 characters';

    updateRequirement(reqLength, false);
    updateRequirement(reqUppercase, false);
    updateRequirement(reqLowercase, false);
    updateRequirement(reqNumber, false);
    updateRequirement(reqSpecial, false);
}


// Focus input on load
window.addEventListener('load', () => {
    passwordInput.focus();
});
