import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Có thể thay đổi thành dịch vụ khác (ví dụ: SendGrid, Mailgun, ...)
    auth: {
      user: process.env.EMAIL_USER, // Địa chỉ email gửi
      pass: process.env.EMAIL_PASS, // Mật khẩu email
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Địa chỉ email gửi
    to: options.to, // Địa chỉ email người nhận
    subject: options.subject, // Tiêu đề email
    text: options.text, // Nội dung email dạng text
    html: options.html || '', // Nội dung email dạng HTML (nếu có)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error:', error.message); // In thông báo lỗi chi tiết
    console.error('Stack:', error.stack); // In stack trace
  }
};

export default sendEmail;
