const passwordInput = document.getElementById('passwordInput');
const strengthMeterFill = document.getElementById('strengthMeterFill');
const strengthText = document.getElementById('strengthText');
const togglePassword = document.getElementById('togglePassword');
const crackTime = document.getElementById('crackTime');
const charCount = document.getElementById('charCount');

// Requirement elements
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqLowercase = document.getElementById('req-lowercase');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '🙈';
});

// Check password strength
passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    const count = password.length;
    charCount.textContent = `${count} character${count === 1 ? '' : 's'}`;
    
    if (password.length === 0) {
        resetStrengthMeter();
        return;
    }
    
    const strength = calculatePasswordStrength(password);
    updateUI(strength, password);
});

function calculatePasswordStrength(password) {
    let score = 0;
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
    
    // Update requirement indicators
    updateRequirement(reqLength, checks.length);
    updateRequirement(reqUppercase, checks.uppercase);
    updateRequirement(reqLowercase, checks.lowercase);
    updateRequirement(reqNumber, checks.number);
    updateRequirement(reqSpecial, checks.special);
    
    // Calculate base score
    if (checks.length) score += 20;
    if (checks.uppercase) score += 20;
    if (checks.lowercase) score += 20;
    if (checks.number) score += 20;
    if (checks.special) score += 20;
    
    // Bonus points for length
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;
    if (password.length >= 20) score += 10;
    
    // Penalty for common patterns
    if (hasCommonPatterns(password)) {
        score -= 20;
    }
    
    // Penalty for repetitive characters
    if (hasRepetitiveChars(password)) {
        score -= 15;
    }
    
    // Bonus for variety
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= password.length * 0.8) {
        score += 10;
    }
    
    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));
    
    return {
        score: score,
        checks: checks,
        level: getStrengthLevel(score)
    };
}

function hasCommonPatterns(password) {
    const commonPatterns = [
        /123/i,
        /abc/i,
        /qwerty/i,
        /password/i,
        /admin/i,
        /letmein/i,
        /welcome/i,
        /monkey/i,
        /dragon/i,
        /master/i
    ];
    
    return commonPatterns.some(pattern => pattern.test(password));
}

function hasRepetitiveChars(password) {
    // Check for 3 or more consecutive identical characters
    return /(.)\1{2,}/.test(password);
}

function getStrengthLevel(score) {
    if (score < 20) return { name: 'Very Weak', class: 'very-weak', width: '20%' };
    if (score < 40) return { name: 'Weak', class: 'weak', width: '40%' };
    if (score < 60) return { name: 'Medium', class: 'medium', width: '60%' };
    if (score < 80) return { name: 'Strong', class: 'strong', width: '80%' };
    return { name: 'Very Strong', class: 'very-strong', width: '100%' };
}

function updateRequirement(element, isMet) {
    if (isMet) {
        element.classList.add('met');
    } else {
        element.classList.remove('met');
    }
}

function updateUI(strength, password) {
    const level = strength.level;
    
    // Update strength meter
	strengthMeterFill.style.width = level.width;
	// Ensure inline color fully controls the bar color
	strengthMeterFill.className = 'strength-meter-fill';
	// Smooth color from red (weak) to green (strong) based on score
	const hue = Math.round((strength.score / 100) * 120); // 0=red, 120=green
	strengthMeterFill.style.background = `hsl(${hue}, 70%, 45%)`;
    
    // Update strength text
    strengthText.textContent = level.name;
    strengthText.className = 'strength-text text-' + level.class;
    
    // Update crack time estimation
    updateCrackTime(password, strength);
}

function updateCrackTime(password, strength) {
    const possibleChars = calculatePossibleChars(strength.checks);
    const combinations = Math.pow(possibleChars, password.length);
    
    // Assume 1 billion guesses per second (modern GPU)
    const guessesPerSecond = 1e9;
    const secondsToCrack = combinations / (2 * guessesPerSecond); // Divide by 2 for average case
    
    const timeString = formatTime(secondsToCrack);
    
    let message = `<strong>Estimated crack time:</strong> ${timeString}`;
    
    if (secondsToCrack < 1) {
        message += '<br><span style="color: #ef4444;">⚠️ This password could be cracked instantly!</span>';
    } else if (secondsToCrack < 3600) {
        message += '<br><span style="color: #f97316;">⚠️ This password is vulnerable to brute force attacks!</span>';
    } else if (secondsToCrack < 86400 * 365) {
        message += '<br><span style="color: #fbbf24;">Consider using a longer password with more variety.</span>';
    } else {
        message += '<br><span style="color: #10b981;">✓ Good! This password is resistant to brute force attacks.</span>';
    }
    
    crackTime.innerHTML = message;
}

function calculatePossibleChars(checks) {
    let chars = 0;
    if (checks.lowercase) chars += 26;
    if (checks.uppercase) chars += 26;
    if (checks.number) chars += 10;
    if (checks.special) chars += 32; // Common special characters
    return Math.max(chars, 26); // Minimum 26 (lowercase only)
}

function formatTime(seconds) {
    if (seconds < 1) {
        return 'Instantly';
    } else if (seconds < 60) {
        return `${Math.round(seconds)} seconds`;
    } else if (seconds < 3600) {
        return `${Math.round(seconds / 60)} minutes`;
    } else if (seconds < 86400) {
        return `${Math.round(seconds / 3600)} hours`;
    } else if (seconds < 86400 * 30) {
        return `${Math.round(seconds / 86400)} days`;
    } else if (seconds < 86400 * 365) {
        return `${Math.round(seconds / (86400 * 30))} months`;
    } else if (seconds < 86400 * 365 * 100) {
        return `${Math.round(seconds / (86400 * 365))} years`;
    } else if (seconds < 86400 * 365 * 1000) {
        return `${Math.round(seconds / (86400 * 365 * 100))} centuries`;
    } else if (seconds < 86400 * 365 * 1000000) {
        return `${Math.round(seconds / (86400 * 365 * 1000))} millennia`;
    } else {
        return 'Millions of years';
    }
}

function resetStrengthMeter() {
    strengthMeterFill.style.width = '0%';
    strengthMeterFill.className = 'strength-meter-fill';
    strengthText.textContent = 'Enter a password to check its strength';
    strengthText.className = 'strength-text';
    crackTime.innerHTML = '';
    charCount.textContent = '0 characters';
    
    // Reset requirements
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

