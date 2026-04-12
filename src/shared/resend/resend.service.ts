import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ResendService {
  private resend: Resend;
  private from: string;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY') as string);
    this.from = this.configService.get('RESEND_FROM') as string;
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.resend.emails.send({ from: this.from, to, subject, html });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to send email: ${error.message}`);
    }
  }

  async sendPasswordReset(to: string, resetUrl: string): Promise<void> {
    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h2>Reset your All-E password</h2>
        <p>Click the link below to reset your password. This link expires in 1 hour.</p>
        <p><a href="${resetUrl}" style="display:inline-block;background:#00a884;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Reset password</a></p>
        <p style="color:#888;font-size:12px">If you didn't request this, ignore this email.</p>
      </div>`;
    await this.send(to, 'Reset your All-E password', html);
  }

  async sendContactMessage(toCreator: string, fromName: string, fromEmail: string, message: string): Promise<void> {
    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h3>New contact message</h3>
        <p><strong>From:</strong> ${fromName} &lt;${fromEmail}&gt;</p>
        <p style="white-space:pre-wrap">${message.replace(/</g, '&lt;')}</p>
      </div>`;
    await this.send(toCreator, `All-E contact: ${fromName}`, html);
  }
}
