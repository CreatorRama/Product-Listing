import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: {
        // Only for development - remove in production
        rejectUnauthorized: process.env.NODE_ENV !== 'production'
    }
});

// Verify connection on startup
transporter.verify((error) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('SMTP Connection Verified');
    }
});
// Verify connection configuration
transporter.verify()
    .then(() => console.log('SMTP connection verified'))
    .catch(error => console.error('SMTP verification failed:', error));


export async function sendEnquiryEmail(item, userEmail) {
    try {
        await transporter.sendMail({
            from: `"AMRR TechSols" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Enquiry about ${item.name}`,
            text: `
        New enquiry received:
        
        Item: ${item.name}
        Type: ${item.type}
        User Email: ${userEmail}
        
        Description:
        ${item.description}
      `,
            html: `
        <h1>New enquiry received</h1>
        <p><strong>Item:</strong> ${item.name}</p>
        <p><strong>Type:</strong> ${item.type}</p>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <p><strong>Description:</strong></p>
        <p>${item.description}</p>
      `,
        });
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}