import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Desafio } from './interface/desafio.interface';
import { Partida } from 'src/partidas/interface/partida.interface';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { DesafioStatus } from './interface/desafio-status-enum';
import { PartidasService } from 'src/partidas/partidas.service';
import { createSecureContext } from 'tls';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';

@Injectable()
export class DesafiosService {
    
    //@InjectModel('Partida') private readonly partidaModel: Model<Partida>,
  constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>, 
    private readonly jogadoresService: JogadoresService,
    private readonly partidasService: PartidasService,
    private readonly categoriasService: CategoriasService){}

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio>{
       // const {dataHoraDesafio, jogadores} = criarDesafioDto;
        
        const jogadores = await this.jogadoresService.consultarTodosJogadores();
    
        criarDesafioDto.jogadores.map(async (jogadorDto) => {
        //Compara jogadoresDto com jogadores recuperados
          const jogadorFilter = jogadores.filter(jogador => jogador._id == jogadorDto._id)
      
          if(jogadorFilter.length == 0) {
            throw new BadRequestException(`O ID ${jogadorDto._id} não é jogador`);
          }
        })

        const solicitanteEhJogador = criarDesafioDto.jogadores.filter(jogador => jogador._id == criarDesafioDto.solicitante);       

        if(solicitanteEhJogador.length == 0) { //devido filter N
            throw new BadRequestException(`O solicitante deve ser um jogador da partida`);
        }

        const categoriaEncontrada = await this.categoriasService.consultarCategoriaPorId(criarDesafioDto.solicitante._id);

        if(!categoriaEncontrada) {
            throw new BadRequestException(`O solicitante precisa está registrado em uma categoria`);
        }  

        //Jogadores inclusos no DTO
     const desafioCriado = new this.desafioModel(criarDesafioDto);  
     desafioCriado.categoria = categoriaEncontrada.categoria;
     desafioCriado.dataHoraSolicitacao = new Date();
     //logger  
     desafioCriado.status = DesafioStatus.PENDENTE;

       return desafioCriado.save();
    }


    async consultarTodosDesafios(): Promise<Array<Desafio>>{

        return await this.desafioModel.find()
          .populate("solicitante")
          .populate("jogadores")
          .populate("partida")
          .exec();
    }

    async consultarDesafiosDeUmJogador(_id: any):Promise<Array<Desafio>>{
             //_id tipo any
        const jogadores = await this.jogadoresService.consultarTodosJogadores();
        const jogadorFilter = jogadores.filter(jogador => jogador._id == _id);

        if(!jogadorFilter){
            throw new BadRequestException(`O Id ${_id} informado não é um jogador"`)
        }

            //corrigir
        return await this.desafioModel.find()
         .where('jogadores')  //No Array
         .in(_id)             //Ha id info
         .populate("solicitante")
         .populate("jogadores")
         .populate("partida")
         .exec();
    }

    async atualizarDesafio(_id: any, atualizarDesafioDto:AtualizarDesafioDto):Promise<void>{

        const desafioEncontrado = await this.desafioModel.findById(_id).exec();
    
        if(!desafioEncontrado){
            throw new NotFoundException(`Desafio ${_id} não cadastrado!`);
        }

        if(atualizarDesafioDto.status){
            desafioEncontrado.dataHoraResposta = new Date();
        }

        desafioEncontrado.status = atualizarDesafioDto.status;
        desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio;

        await this.desafioModel.findOneAndUpdate({_id}, {$set: {desafioEncontrado}}).exec();
    }
}
