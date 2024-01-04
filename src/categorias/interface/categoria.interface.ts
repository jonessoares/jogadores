import { Document } from 'mongoose';
import { Jogador } from '../../jogadores/interfaces/jogador.interface';

export interface Categoria extends Document {
  readonly categoria: String;
  descricao: String;
  eventos: Array<Evento>        //atribui ID auto a cada
  jogadores: Array<Jogador>  //atribui ID auto a cada
}

export interface Evento extends Document {
   nome: String,
   operacao: String,
   valor: Number
}