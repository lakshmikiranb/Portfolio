// Admin Login Modal
function showLoginModal() {
    document.getElementById('adminLoginModal').style.display = 'flex';
}

// Show Forgot Password Modal
function showForgotPasswordModal() {
    document.getElementById('adminLoginModal').style.display = 'none';
    document.getElementById('forgotPasswordModal').style.display = 'flex';
}

// Show OTP Modal
function showOtpModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('otpModal').style.display = 'flex';
}

// Admin Login (simulated)
function adminLogin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const errorMessage = document.getElementById('loginErrorMessage');

    if (email === 'lakshmi2000kiran@gmail.com' && password === 'admin123') {
        alert('Admin login successful!');
        document.getElementById('adminLoginModal').style.display = 'none';
    } else {
        errorMessage.textContent = 'Invalid login credentials';
    }
}

// Forgot Password OTP Process
function sendOtp() {
    const email = document.getElementById('forgotEmail').value;
    const phone = document.getElementById('forgotPhone').value;
    const errorMessage = document.getElementById('forgotErrorMessage');

    if (email === 'lakshmi2000kiran@gmail.com' && phone === '8374056396') {
        alert('OTP has been sent to your email and phone!');
        showOtpModal();
    } else {
        errorMessage.textContent = 'Invalid email or phone number';
    }
}

// Reset Password (simulated)
function resetPassword() {
    const otp = document.getElementById('otpInput').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const otpErrorMessage = document.getElementById('otpErrorMessage');

    if (otp === '123456' && newPassword === confirmPassword) {
        alert('Password has been successfully reset');
        document.getElementById('otpModal').style.display = 'none';
        document.getElementById('adminLoginModal').style.display = 'flex';
    } else {
        otpErrorMessage.textContent = 'Invalid OTP or passwords do not match';
    }
}

// Resume download function
function downloadResume() {
    alert("Download link functionality can be added here.");
}