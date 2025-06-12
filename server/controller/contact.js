import nodemailer from 'nodemailer';

export async function sendContactEmail(req, res) {
    const { name, email, message } = req.body;

    try {
        // Create transporter with new keyword
        const transporter = new nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port: 587, 
            secure: false, 
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
            html: `<h3>New Contact Form Submission</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong></p>
                   <p>${message}</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Error sending message", error: error.message });
    }
}