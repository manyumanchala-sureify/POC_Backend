import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsArray,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  IsOptional,
  validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEmailArray' })
export class IsEmailArray implements ValidatorConstraintInterface {
  expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  validate(emails: string[]): boolean {
    if (emails) {
      return emails.every((mail) => this.expression.test(mail));
    }
    return false;
  }
}

@ValidatorConstraint({ name: 'isUrlValid' })
export class IsUrlValid implements ValidatorConstraintInterface {
  expression =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    // /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  validate(url: string): boolean {
    console.log("url",url)
    if (url.trim()) {
      console.log("val",this.expression.test(url))
      return this.expression.test(url.trim());
    }
    return false;
  }
}

// “((http|https)://)(www.)?” 
// + “[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]” 
// + “{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)”

export class CreateMailDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty({ message: 'To Email must not be Empty' })
  @IsEmail()
  toEmail: string;

  @IsOptional()
  @IsArray()
  @Validate(IsEmailArray, { message: 'Enter valid CC Emails' })
  ccEmail: string[];

  @IsOptional()
  @IsArray()
  @Validate(IsEmailArray, { message: 'Enter valid BCC Emails' })
  bccEmail: string[];

  @IsOptional()
  subject: string;

  @IsOptional()
  body: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsUrlValid, { message: 'Enter valid Url' })
  url: string;
}
