[gemini-code-1786880571834.js](https://github.com/user-attachments/files/31116349/gemini-code-1786880571834.js)
function login() {
    const emailInput = document.getElementById('auth-email').value;
    const regFname = document.getElementById('reg-fname').value;
    const regLname = document.getElementById('reg-lname').value;
    
    if(emailInput) {
        clientEmail = emailInput;
    }
    if(regFname) clientFirstName = regFname;
    if(regLname) clientLastName = regLname;

    isUserLoggedIn = true;
    
    // التحقق من وجود العنصر قبل إخفائه لتجنب الأخطاء
    const authButtons = document.getElementById('header-auth-buttons');
    if(authButtons) authButtons.style.display = 'none';
    
    document.getElementById('navbar').style.display = 'flex';
    updateBalancesDisplay();
    showPage('home');
}
