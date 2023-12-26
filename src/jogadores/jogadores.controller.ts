import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { CriarJogadorDto} from './dtos/criar-jogador.dto'

import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService:JogadoresService){}

    
    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto  //Body carrega dados
    ): Promise<any>{
        //const { email } = criarJogadorDto;  //return JSON.stringify(`{"email: ${email}}`);
        
       return await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
   }

   @Get()
   async consultarJogadores(@Query('email') email:string): Promise<Jogador[] | Jogador>{
     if(email){
        return await this.jogadoresService.consultarJogadorPorEmail(email);
     }
     else{
       return await this.jogadoresService.consultarTodosJogadores();
     }
   }

   @Delete()
   async deletarJogador(@Query('email') email:string):Promise<any> {
      return await this.jogadoresService.deletarJogador(email);
   }
 }
      