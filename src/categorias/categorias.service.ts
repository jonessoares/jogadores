import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Categoria } from '../categorias/interface/categoria.interface';
import { CriarCategoriaDto } from '../categorias/dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from '../categorias/dtos/atualizar-categoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { JogadorSchema } from 'src/jogadores/interfaces/jogador.schema';


@Injectable()
export class CategoriasService {
    private readonly logger = new Logger(CategoriasService.name);

    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
      private readonly jogadoresService: JogadoresService){}


    async criarCategoria(criarCategoriaDto: CriarCategoriaDto):Promise<Categoria>{
        const { categoria } = criarCategoriaDto;  
          //const {eventos[0]['nome']} = criarCategoriaDto;
          //console.log(categoria);  //"E"
              
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
 
        if(categoriaEncontrada){
           throw new BadRequestException(`Categoria ${categoria} já cadastrada!`);
        }

        const criaCategoria = new this.categoriaModel(criarCategoriaDto);

        return await criaCategoria.save();
    }


   async consultarTodasCategorias():Promise<Array<Categoria>>{
    //NOTA busca do relacionamento / populate
     return await this.categoriaModel.find({}).populate({path:'jogadores', model: "Jogador"}).exec();
         //'jogadores.jogador'
   }  

  async consultarCategoriaPorId(categoria:String):Promise<Categoria>{
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria})
        .populate({path:'jogadores', model:'Jogador'}).exec();
     
        if(!categoriaEncontrada){
            throw new NotFoundException(`Categoria ${categoria} não encontrada!`);
        }

       return categoriaEncontrada;
  }


  async atualizarCategoria(categoria:String, atualizaJogadorDto: AtualizarCategoriaDto):Promise<void>{

    const categoriaEncontrada = this.categoriaModel.findOne({categoria}).exec();
    if(!categoriaEncontrada){
        throw new NotFoundException(`Categoria ${categoria} informada não Encontrada!`)
    }
    
     await this.categoriaModel.findOneAndUpdate({categoria},{$set: atualizaJogadorDto}).exec();
  }

  //Array<String>
  async atribuirJogadorCategoria(params: String[]):Promise<void>{
      const categoria = params['categoria']
      const idJogador = params['idJogador']
    
      const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
      
      if(!categoriaEncontrada){
        throw new BadRequestException(`Categoira ${categoria} informada não encontrada!`);
      }

      //QueryBuilder
      const jogadorNaCategoria = await this.categoriaModel.find({categoria})
        .where('jogadores').in(idJogador).exec(); 

        //console.log(jogadorNaCategoria);

      if(jogadorNaCategoria.length > 0){  //Array
            throw new BadRequestException(`Jogador com ID ${idJogador} já cadastrado na Categoria ${categoria}`);
      }

      //Nesta chamada, se nao encontrando quem lança Excp é JogadorService  
      await this.jogadoresService.consultarJogadorPorId(idJogador);

      categoriaEncontrada.jogadores.push(idJogador);
      await this.categoriaModel.findOneAndUpdate({categoria},{$set: categoriaEncontrada}).exec();
  }
}
