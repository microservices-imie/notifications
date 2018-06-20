import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'usermicroimie@gmail.com',
      pass: 'usermicro',
    },
  });

  constructor() { }

  async sendMail(mailOptions) {
    return this.transporter.sendMail(mailOptions);
  }
}
