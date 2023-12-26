import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    // Metodo q viabiliza comunicacao c/DB
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}
    
    private readonly logger = new Logger(JogadoresService.name)
    //private jogadores: Jogador[] = [];  //tipo importado da interface

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<any>{  

        const {email} = criarJogadorDto; 

        //const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);
        const jogadorEncontrado:Jogador = await this.jogadorModel.findOne({email}).exec();
        
        if(jogadorEncontrado){
            return await this.atualizar(criarJogadorDto);
           
        }

        return await this.criar(criarJogadorDto);
    }  

                 
                            //***o q é a fç(promise) e q devolve***
    async consultarTodosJogadores(): Promise<Jogador[]>{ 
      //return this.jogadores;   //<= nao acessa ainda async 
       return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPorEmail(email:string): Promise<Jogador[] | Jogador>{
        //const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com email ${email} não encontrado!`)
        }

       return jogadorEncontrado;
    }


    async deletarJogador(email:string): Promise<any>{
          const jogadorRemovido = await this.jogadorModel.deleteOne({email}).exec();

          //console.log(jogadorRemovido.deletedCount);

          if(jogadorRemovido.deletedCount == 0){
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
          }
          
          return jogadorRemovido.deletedCount;

        //  const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
        // *****  deleteOne() deleteMany() fineOneAndDelete()
         //refatorado / pode-se inserir no Log
       /*
         if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        }
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
        */
     }



    //Metodos  *******
    private async atualizar(criaJogadorDto: CriarJogadorDto): Promise<Jogador>{
       return await this.jogadorModel.findOneAndUpdate({email: criaJogadorDto.email},{$set: criaJogadorDto}).exec();
      
       /* //atualizar(jogadorEncontrado:Jogador, criaJogadorDto: CriarJogadorDto)
        const {nome} = criaJogadorDto;
        jogadorEncontrado.nome = nome;
        */
    }

     // O criarJogadorDTO é recebido do REQ 
    private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador>{
        
        const jogadorCriado = new this.jogadorModel(criaJogadorDto);

        this.logger.log(`criaJogadorDto: ${JSON.stringify(criaJogadorDto)}`)

        return await jogadorCriado.save();

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

        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador); */
    }
}



/*
Model.findOneAndUpdate({ otp: User.otp }, {$unset: {otp: 1 }},(err, res) => {
    if (err) console.log(err)
    else console.log("succesful");
     })
})
*/