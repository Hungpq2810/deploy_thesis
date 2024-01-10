import nodemailer from 'nodemailer';

export interface EmailDetails {
  subject: string;
  body: string;
}

class EmailUtils {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'hungphiquoc1@gmail.com', //
        pass: 'udjm qshx slip hqsb', //
      },
    });
  }

  sendEmail(receiverEmail: string, emailDetails: EmailDetails): void {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'hungphiquoc1@gmail.com',
      to: receiverEmail,
      subject: emailDetails.subject,
      text: emailDetails.body,
    };

    this.transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error('Error occurred while sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
}

export { EmailUtils };
