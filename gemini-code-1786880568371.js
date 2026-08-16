[gemini-code-1786880568371.js](https://github.com/user-attachments/files/31116345/gemini-code-1786880568371.js)
function logout() {
    isUserLoggedIn = false;
    
    const authButtons = document.getElementById('header-auth-buttons');
    if(authButtons) authButtons.style.display = 'flex';
    
    document.getElementById('navbar').style.display = 'none';
    openAuthModal('login');
}
