import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { request } from 'express';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        data: { ...data, statusCode: response.statusCode },
        timeStamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}

//     catchError(err => {
//     if (true) {
//         console.log("ppp",context.switchToHttp().getResponse().statusCode)
//       return throwError(() => new BadGatewayException());
//     }
//     return throwError(() => err);
//   }),

// catchError((err) => {
//   console.log("pppp",context.switchToHttp().getResponse())ol
//   return throwError(
//     () =>
//       new BadGatewayException(context.switchToHttp().getResponse().message),
//   ),
// }),
// return next.handle().pipe(
//   map((data) => ({
//         data: data,
//         statusCode: context.switchToHttp().getResponse().statusCode,
//         others: "message",
//    }))
// );
