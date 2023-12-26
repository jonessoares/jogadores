import { Document } from 'mongoose';

export interface Jogador extends Document {
  //  readonly _id: String;   //nao envia
    readonly email: String;
    readonly celular: String;
    nome: String;
    ranking: String;   //nao envia
    posicaoRanking: Number;    //nao envia
    urlFotoJogador: String;  //nao envia
}

