[gemini-code-1786880559142.js](https://github.com/user-attachments/files/31116322/gemini-code-1786880559142.js)
function renderPlans() {
    const plansContainer = document.getElementById('plans-container-grid');
    if (!plansContainer) return;

    let html = '';
    plansData.forEach(plan => {
        const planName = currentLang === 'en' ? plan.nameEn : plan.nameAr;
        
        // حساب 70% من قيمة الشراء
        const totalProfit = plan.price * 0.70; 
        // تقسيم الربح على 4 شهور
        const monthlyProfit = totalProfit / 4; 
        // المبلغ الكلي المتوقع (رأس المال + الأرباح)
        const totalExpectedAmount = plan.price + totalProfit;

        const monthlyProfitText = (currentLang === 'en' ? 'Estimated Monthly Profit: ' : 'المبلغ الشهري المقدر: ') + '$' + monthlyProfit.toLocaleString();
        const totalExpectedText = (currentLang === 'en' ? 'Total After 4 Months: ' : 'المبلغ الكلي (خلال 4 شهور): ') + '$' + totalExpectedAmount.toLocaleString();
        
        const btnText = currentLang === 'en' ? 'Buy Plan' : 'شراء الخطة';

        html += `
            <div class="plan-card">
                <h3>${planName}</h3>
                <div class="plan-price">$${plan.price.toLocaleString()}</div>
                <p style="color: var(--primary-color); font-size:14px; font-weight:bold; margin-bottom: 5px;">${monthlyProfitText}</p>
                <p style="color: var(--success); font-size:13px; margin-bottom: 5px;">${totalExpectedText}</p>
                <button class="btn" style="margin-top: 15px;" onclick="buyPlan(${plan.id})">${btnText}</button>
            </div>
        `;
    });
    plansContainer.innerHTML = html;
}
