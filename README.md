<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الموقع تحت الصيانة | Under Maintenance</title>
    <!-- استيراد خط أنيق من خطوط جوجل -->
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Cairo', sans-serif;
        }

        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .icon {
            font-size: 60px;
            margin-bottom: 20px;
            animation: bounce 2s infinite;
        }

        h1 {
            font-size: 28px;
            margin-bottom: 15px;
            color: #38bdf8;
        }

        p {
            font-size: 16px;
            color: #94a3b8;
            margin-bottom: 10px;
            line-height: 1.6;
        }

        .divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
            margin: 25px 0;
        }

        .en-section {
            direction: ltr;
        }

        .en-section h2 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #38bdf8;
        }

        .en-section p {
            font-size: 15px;
            color: #94a3b8;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-15px);
            }
            60% {
                transform: translateY(-7px);
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <!-- أيقونة الترس المتحركة -->
        <div class="icon">⚙️</div>

        <!-- القسم العربي -->
        <div class="ar-section">
            <h1>الموقع تحت الانشاء والصيانة</h1>
            <p>نحن نعمل على تطوير وتحسين موقعنا لنقدم لكم تجربة أفضل قريباً. شكراً لتفهمكم!</p>
        </div>

        <div class="divider"></div>

        <!-- القسم الإنجليزي -->
        <div class="en-section">
            <h2>Website Under Construction</h2>
            <p>We are working hard to improve our website and bring you a better experience soon. Thank you for your patience!</p>
        </div>
    </div>

</body>
</html>
