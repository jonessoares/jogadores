import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
//import {v4 as uuidv4} from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    // Metodo q viabiliza comunicacao c/DB
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}
    
    private readonly logger = new Logger(JogadoresService.name)
    //private jogadores: Jogador[] = [];  //tipo importado da interface

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{  
        //const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);
        const {email} = criarJogadorDto;  
        const jogadorEncontrado:Jogador = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado){
            throw new BadRequestException(`Endereço de email: ${email} em uso!`);
        }

        const jogadorCriado = new this.jogadorModel(criarJogadorDto);

        this.logger.log(`criarJogadorDto: ${JSON.stringify(criarJogadorDto)}`)

        return await jogadorCriado.save();
       
    }  // return await this.criar(criarJogadorDto);

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void>{ 
        //const {email} = criarJogadorDto;  
        const jogadorEncontrado:Jogador = await this.jogadorModel.findOne({_id}).exec();
        
        if(!jogadorEncontrado){
            new NotFoundException(`Jogador com ${_id} não encontrado!`);
        }
        
        this.logger.log(`atualizaJogadorDto: ${JSON.stringify(atualizarJogadorDto)}`);

        await this.jogadorModel.findOneAndUpdate({_id},{$set: atualizarJogadorDto}).exec();
        
    } //return await this.atualizar(criarJogadorDto);

    async consultarTodosJogadores(): Promise<Jogador[]>{  //***o q é a fç(promise) e q devolve***
      //return this.jogadores;   
       return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPorId(_id:string): Promise<Jogador>{   
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com Id informado não encontrado!`)
        }

       return jogadorEncontrado;
    } 

    async consultarJogadorPorEmail(email:string): Promise<Jogador>{  
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(!jogadorEncontrado){ //pode-se criar metodo privado para exceptions
            throw new NotFoundException(`Jogador com email ${email} não encontrado!`)
        }

       return jogadorEncontrado;
    }  //const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

    async deletarJogador(_id:string): Promise<any>{
          const jogadorRemovido = await this.jogadorModel.deleteOne({_id}).exec();

          if(jogadorRemovido.deletedCount == 0){
            throw new NotFoundException(`Jogador com Id informado não encontrado!`)
          }

          return jogadorRemovido.deletedCount;

       //console.log(jogadorRemovido.deletedCount);
       //  const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
       // ***** deleteMany() fineOneAndDelete()
       /*
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        }
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
        */
     }


    //  ****  Metodos memoria *****
   /* private async atualizar(criaJogadorDto: CriarJogadorDto): Promise<Jogador>{
        this.logger.log(`atualizaJogadorDto: ${JSON.stringify(criaJogadorDto)}`)
        return await this.jogadorModel.findOneAndUpdate({email: criaJogadorDto.email},{$set: criaJogadorDto}).exec();
      
        //atualizar(jogadorEncontrado:Jogador, criaJogadorDto: CriarJogadorDto)
        const {nome} = criaJogadorDto;
        jogadorEncontrado.nome = nome;      
    } */

     // O criarJogadorDTO é recebido do REQ 
    /*  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador>{
        
        const jogadorCriado = new this.jogadorModel(criaJogadorDto);

        this.logger.log(`criaJogadorDto: ${JSON.stringify(criaJogadorDto)}`)

        return await jogadorCriado.save();
   */
        /*
        const { nome, celular, email} = criaJogadorDto
        const jogador: Jogador = {
           // _id: uuidv4(),
            nome,
            celular,
            email,
            ranking: 'A',   //nao envia
            posicaoRanking: 1,    //nao envia
            urlFotoJogador: 'www.google.com/foto123.jpg', //nao envia
        } 
        this.jogadores.push(jogador); 
    } */
}