const nodemailer = require('nodemailer');
const html_pdf = require('html-pdf-node');
const generateInvoiceHTML = require('../templates/invoiceTemplate');

// 1. Configure the "Sender" (Your Gmail)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'sprintsagaindia@gmail.com',
        pass: 'mstplrauewjyulsa' // We will get this in Step 3
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendInvoiceEmail = async (userEmail, paymentData) => {
    try {
        // 2. Convert Template to HTML
        const htmlContent = generateInvoiceHTML(paymentData);

        // 3. Convert HTML to PDF Buffer
        let options = { format: 'A4', margin: { top: '20px', bottom: '20px' } };
        let file = { content: htmlContent };
        const pdfBuffer = await html_pdf.generatePdf(file, options);

        // 4. Set up the Email
        const mailOptions = {
            from: '"Sprints Saga India" <sprintssagaindia@gmail.com>',
            to: userEmail,
            subject: `Invoice: LokRaja Marathon Registration - ${paymentData.invoiceNo}`,
            text: `Hello ${paymentData.firstName}, your registration for Sprints Saga India is confirmed. Please find your invoice attached.`,
            attachments: [
                {
                    filename: `Invoice_${paymentData.invoiceNo}.pdf`,
                    content: pdfBuffer
                }
            ]
        };

        // 5. Send it
        await transporter.sendMail(mailOptions);
        console.log('✅ Invoice email sent successfully to:', userEmail);
        return true;
    } catch (error) {
        console.error('❌ Email Error:', error);
        return false; // Returns false instead of crashing the site
    }
};

module.exports = { sendInvoiceEmail };