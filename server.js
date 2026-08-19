const express = require('express');
const nodemailer = require('nodemailer');
const redis = require('redis');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. الاتصال بقاعدة بيانات Redis لحفظ الأكواد مؤقتاً
const redisClient = redis.createClient();
redisClient.connect().then(() => console.log('Connected to Redis'));

// 2. إعداد سيرفر إرسال الإيميل (SMTP)
const transporter = nodemailer.createTransport({
    service: 'gmail', // يمكنك تغييره إلى Outlook أو أي مزود آخر
    auth: {
        user: process.env.EMAIL_USER,       // إيميل موقعك الرسمي
        pass: process.env.EMAIL_PASSWORD    // كلمة مرور التطبيق (App Password) وليس الباسورد العادي
    }
});

// 3. API لتوليد وإرسال كود التحقق للإيميل
app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'البريد الإلكتروني مطلوب' });

    // توليد كود عشوائي من 6 أرقام
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        // حفظ الكود في Redis لينتهي بعد 5 دقائق (300 ثانية)
        await redisClient.setEx(`OTP:${email}`, 300, otp);

        // إعدادات محتوى رسالة الإيميل
        const mailOptions = {
            from: `"أمان موقعي" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'كود التحقق الخاص بك (OTP)',
            html: `
                <div style="font-family: Arial, sans-serif; direction: rtl; text-align: center; padding: 20px;">
                    <h2>رمز التحقق لدخول الموقع</h2>
                    <p>يرجى استخدام الكود التالي لإتمام عملية التحقق. الكود صالح لمدة 5 دقائق فقط:</p>
                    <h1 style="color: #4CAF50; letter-spacing: 5px; background: #f4f4f4; padding: 10px; display: inline-block; border-radius: 5px;">${otp}</h1>
                    <p>إذا لم تطلب هذا الكود، يرجى تجاهل هذا الإيميل.</p>
                </div>
            `
        };

        // إرسال الإيميل فعلياً
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'تم إرسال كود التحقق إلى البريد الإلكتروني بنجاح' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'فشل في إرسال البريد الإلكتروني' });
    }
});

// 4. API للتحقق من الكود المدخل من العميل
app.post('/api/verify-otp', async (req, res) => {
    const { email, otpCode } = req.body;

    if (!email || !otpCode) return res.status(400).json({ error: 'البيانات غير كاملة' });

    try {
        // جلب الكود المخزن للإيميل
        const cachedOtp = await redisClient.get(`OTP:${email}`);

        if (!cachedOtp) {
            return res.status(400).json({ error: 'انتهت صلاحية الكود أو لم يتم طلبه بعد' });
        }

        if (cachedOtp === otpCode) {
            // حذف الكود فوراً بعد التحقق الناجح لمنع إعادة الاستخدام
            await redisClient.del(`OTP:${email}`);
            return res.json({ success: true, message: 'تم التحقق بنجاح!' });
        } else {
            return res.status(400).json({ error: 'كود التحقق غير صحيح' });
        }
    } catch (error) {
        res.status(500).json({ error: 'حدث خطأ في الخادم' });
    }
});

app.listen(3000, () => console.log('Email OTP Server running on port 3000'));
