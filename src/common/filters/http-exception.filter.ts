import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";


@Catch(HttpException)   //Para implantar Exception - decorator na class
export class AllExceptionsFilter implements ExceptionFilter{

      private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
      
  const ctx = host.switchToHttp();
  const response = ctx.getResponse();
  const request = ctx.getRequest(); 

   const status = exception instanceof HttpException ? 
     exception.getStatus() : 
     HttpStatus.INTERNAL_SERVER_ERROR;

   const message = exception instanceof HttpException ? 
     exception.getResponse() : exception['message'];  //tst se error devolve exception

      this.logger.error(`Http Status: ${status}, Error Message: ${JSON.stringify(message)}`)

      response.status(status).json({
           timestamp: new Date().toISOString,
           path: request.url,       //rastrear origem do Erro
           error: message
       });
  }
}