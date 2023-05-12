import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMailDto } from './mail.dto';
import { Mail } from './mail.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail) private mailRespository: Repository<Mail>,
    private mailerService: MailerService,
  ) {}

  async sendResumeMail(payload: CreateMailDto) {
    const result = await this.mailerService.sendMail({
      to: payload.toEmail,
      cc: payload.ccEmail,
      bcc: payload.bccEmail,
      // from: '"Support Team" <support@gmail.com>', // override default from email
      subject: payload.subject ? payload.subject : 'Welcome back!!!',
      template: './resume',
      context: {
        name: payload.name,
        body: payload.body ? payload.body : '',
        url: payload.url,
      },
    });

    if (result.accepted.length > 0) {
      await this.mailRespository.save(payload);
      return result;
    }

    return 'Please Try Again!!!😃';
  }
}
