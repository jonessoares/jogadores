import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dtos';

import { Desafio } from './interface/desafio.interface';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
//faltou atualizar / Desafio / DesafioStatusValidacaoPipe / AtribuirDesafio / Logger

@Controller('/api/v1/desafios')
export class DesafiosController {

    //Logger ****
    constructor(private readonly desafiosService: DesafiosService){}

     @Post()
     @UsePipes(ValidationPipe)
     async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio>{
        
       return await this.desafiosService.criarDesafio(criarDesafioDto);
     }

     //async consultarDesafiosDeUmJogador(_id: string):Promise<Array<Desafio>>{
         //A chama ocorre pelo metodo consultarTodosDesafios
         // que possui ternario caso seja fornecido ID
     //}


     @Put('/:desafio') //_id
     async atualizarDesafio(@Body(DesafioStatusValidacaoPipe)  //no body 
       atualizarDesafioDto: AtualizarDesafioDto, @Param('desafio') _id: string): Promise<void>{
//return
        await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto);
     }


     @Post('/:_id')
     async atribuirDesafioPartida(_id: string): Promise<Desafio>{

       return //await
     }


    @Get() 
    async consultarTodosDesafios(@Query('idJogador') _id:string):Promise<Array<Desafio>>{
      // Nao obriga query params 
       return _id ? await this.desafiosService.consultarDesafiosDeUmJogador(_id)
        : await this.desafiosService.consultarTodosDesafios();
    }


    @Delete('/_id')
    async deletarDesafio(_id: string): Promise<void>{

      return //await
    }
}
