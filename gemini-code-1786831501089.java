[gemini-code-1786831501089.js](https://github.com/user-attachments/files/31109205/gemini-code-1786831501089.js)
function showPage(pageId) {
    // تحقق صارم: منع الوصول لأي صفحة تماماً إذا لم يكن المستخدم مسجلاً للدخول
    if (!isUserLoggedIn) {
        openAuthModal('login');
        return;
    }

    // إخفاء جميع الصفحات
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    // عرض الصفحة المطلوبة فقط
    const targetPage = document.getElementById(pageId + '-page');
    if(targetPage) {
        targetPage.classList.add('active');
    }
    
    // تحديث شكل الأزرار في القائمة العلوية
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    const activeNavBtn = document.getElementById('nav-' + pageId);
    if(activeNavBtn) {
        activeNavBtn.classList.add('active');
    }
    window.scrollTo(0, 0);
}
