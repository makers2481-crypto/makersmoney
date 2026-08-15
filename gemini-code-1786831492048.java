[gemini-code-1786831492048.js](https://github.com/user-attachments/files/31109225/gemini-code-1786831492048.js)
function confirmDeposit() {
    const amountInput = document.getElementById('deposit-amount');
    const amount = parseFloat(amountInput.value);
    
    if(isNaN(amount) || amount <= 0) {
        alert(currentLang === 'en' ? 'Please enter a valid deposit amount.' : 'الرجاء إدخال مبلغ إيداع صحيح.');
        return;
    }
    
    // تم إيقاف الإضافة التلقائية للرصيد لانتظار موافقة خدمة العملاء
    // userBalance += amount;
    // updateBalancesDisplay();

    const table = document.getElementById('transaction-table');
    if(table) {
        const row = table.insertRow(1);
        row.innerHTML = `
            <td>${currentLang === 'en' ? 'Deposit' : 'إيداع'}</td>
            <td>+$${amount.toLocaleString()}</td>
            <td>${new Date().toISOString().split('T')[0]}</td>
            <td style="color: var(--primary-color); font-weight: bold;">${currentLang === 'en' ? 'Pending' : 'قيد المراجعة'}</td>
            <td><button style="background:transparent; color:var(--primary-color); border:none; cursor:pointer;">${currentLang === 'en' ? 'View' : 'عرض'}</button></td>
        `;
    }

    amountInput.value = '';
    document.getElementById('deposit-area').style.display = 'none';
    
    // رسالة تنبيه للمستخدم تفيد بأن الإيداع قيد المراجعة
    alert(currentLang === 'en' ? 'Deposit request submitted. Waiting for customer service approval.' : 'تم تقديم طلب الإيداع بنجاح. رصيدك قيد المراجعة بانتظار موافقة خدمة العملاء للتنفيذ.');
}
