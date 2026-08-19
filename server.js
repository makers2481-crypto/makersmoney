// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// إعداد خدمة البريد الإلكتروني (استبدل بالبيانات الخاصة بك)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'makers2481@gmail.com', // إيميل الشركة
        pass: 'YOUR_EMAIL_PASSWORD_OR_APP_PASSWORD' // الرقم السري أو App Password
    }
});

app.post('/api/verify-email', (req, res) => {
    const { email, clientId } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'البريد الإلكتروني مطلوب' });
    }

    const verificationLink = `https://makers-of-money.com/verify?id=${clientId}`;

    const mailOptions = {
        from: 'makers2481@gmail.com',
        to: email,
        subject: 'صناع المال - تحقق من بريدك الإلكتروني',
        html: `
            <div style="font-family: Arial, sans-serif; text-align: right; dir: rtl;">
                <h2>مرحباً بك في صناع المال</h2>
                <p>لقد طلبت التحقق من بريدك الإلكتروني.</p>
                <p>الرجاء الضغط على الرابط التالي لتفعيل حسابك وإتاحة السحب:</p>
                <a href="${verificationLink}" style="background-color: #d4af37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">تأكيد البريد الإلكتروني</a>
                <p>إذا لم تكن أنت من طلب ذلك، يرجى تجاهل هذه الرسالة.</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'حدث خطأ أثناء إرسال البريد.' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ message: 'تم إرسال بريد التحقق بنجاح.' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
