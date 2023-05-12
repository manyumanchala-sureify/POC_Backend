import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './mail.dto';
import { ValidationPipe } from './validate.pipe';
import { HttpExceptionFilter } from './exception.filter';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Get()
  sendMsg() {
    return 'success';
  }

  @Post('sendMail')
  @UseInterceptors(LoggingInterceptor)
  @UsePipes(ValidationPipe)
  @UseFilters(HttpExceptionFilter)
  async sendMail(@Body() payload: CreateMailDto) {
    const result = await this.mailService.sendResumeMail(payload);
    if (result.accepted[0] == payload.toEmail) {
      return {
        name: payload.name,
        toEmail: result.accepted[0],
        message: [`Mail sent Successfully`, `Check ${payload.name} Inbox`],
      };
    }
  }

  @Post('ccMail')
  @UseInterceptors(LoggingInterceptor)
  @UsePipes(ValidationPipe)
  @UseFilters(HttpExceptionFilter)
  async ccMail(@Body() payload: CreateMailDto) {
    const result = await this.mailService.sendResumeMail(payload);

    if (result.accepted[0] == payload.toEmail) {
      return {
        name: payload.name,
        toEmail: result.accepted[0],
        message: `Mail sent Successfully,Check ${payload.name} Inbox`,
      };
    }

    // for(var mail in payload.cc) {
    //   this.mailService.sendCCMail(payload)
    // }
  }
}
