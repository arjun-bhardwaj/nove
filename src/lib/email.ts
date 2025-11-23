interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
    // In a real application, you would use a service like Resend, SendGrid, or AWS SES.
    // For now, we will log the email to the console to simulate sending.

    console.log('--- MOCK EMAIL SENDING ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('Body:', html);
    console.log('--------------------------');

    return { success: true };
}
