import { Controller, Post, Body, Put, Get, Param, Query, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService:JogadoresService){}

    //validationPipe fornecido pela Lib
   @Post()
   @UsePipes(ValidationPipe)
   async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto  //Body carrega dados
    ): Promise<Jogador>{
        
       return await this.jogadoresService.criarJogador(criarJogadorDto);
   } //const { email } = criarJogadorDto; //return JSON.stringify(`{"email: ${email}}`);

  @Put('/:_id')
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,  //Body carrega dados
    @Param('_id', ValidacaoParametrosPipe) _id: string
    ): Promise<any>{
    
      return await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
  }

  @Get()  //Promise<Jogador[] | Jogador>
  async consultarJogadores(): Promise<Jogador[]>{
     return await this.jogadoresService.consultarTodosJogadores(); 
  }

   @Get('/email')  //refatorar para envio pelo body/Post
   async consultarJogadorPorEmail(@Query('email', ValidacaoParametrosPipe) email:string): Promise<Jogador>{
       return await this.jogadoresService.consultarJogadorPorEmail(email);
   }

   @Get(':_id')
   async consultarJogadorPorId(@Param('_id', ValidacaoParametrosPipe) _id:string): Promise<Jogador>{
       return await this.jogadoresService.consultarJogadorPorId(_id);
   }

   @Delete(':_id')
   async deletarJogador(@Param('_id', ValidacaoParametrosPipe) _id:string):Promise<any> {
      return await this.jogadoresService.deletarJogador(_id);
   }
 }
      