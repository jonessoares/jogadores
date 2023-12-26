import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

//let url = `mongodb+srv://admin:xe4p12ZdRT3FSCOU@cluster0.ypdbtw3.mongodb.net/`;
let url = `mongodb+srv://admin:xe4p12ZdRT3FSCOU@cluster0.ypdbtw3.mongodb.net/smartranking?retryWrites=true&w=majority`;

@Module({
  imports: [MongooseModule.forRoot(url), JogadoresModule,],
  controllers: [],             //AppController
  providers: [],               //AppService
})

export class AppModule {}
