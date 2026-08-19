const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// قم بتعديل هذه البيانات ببريد خدمة العملاء الخاص بك (مثلاً GMAIL)
// يتطلب تفعيل App Passwords في حساب جوجل الخاص بك
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'makers2481@gmail.com', // الإيميل الخاص بك
        pass: 'YOUR_APP_PASSWORD_HERE' // كلمة مرور التطبيق (App Password)
    }
});

app.post('/send-verification', (req, res) => {
    const { email, id } = req.body;

    const mailOptions = {
        from: 'makers2481@gmail.com',
        to: email, // يتم الإرسال إلى إيميل العميل
        subject: 'تأكيد الحساب - صناع المال (Makers of Money)',
        text: `مرحباً بك عميلنا العزيز (رقم الحساب: ${id}) \n\n يرجى الرد على هذه الرسالة مع إرفاق صورة الهوية لتأكيد حسابك وتفعيل السحب.\n\n شكراً لاختيارك صناع المال.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Verification email sent successfully');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
