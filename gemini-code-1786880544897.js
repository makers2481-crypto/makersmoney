setInterval(() => {
    if(isUserLoggedIn && activePlansList.length > 0) {
        activePlansList.forEach(item => {
            const planObj = plansData.find(p => p.id === item.planId);
            
            // حساب الربح الشهري بناءً على الخوارزمية الجديدة (70% / 4)
            const monthlyProfit = (planObj.price * 0.70) / 4; 
            
            item.accumulatedProfit += monthlyProfit;
            totalAddedProfits += monthlyProfit;
            userBalance += monthlyProfit;
        });
        updateBalancesDisplay();
        renderActivePlans();
    }
}, 10000); // ملاحظة: يمكنك تغيير 10000 (10 ثوانٍ) للوقت الفعلي الذي تريده لإضافة الأرباح
