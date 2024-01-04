import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
   nome: String,
   email: {type: String, unique: true},
   celular: { type: String},
   ranking: String,
   posicaoRanking: Number,
   urlFotoJogador: String,
  }, {timestamps: true, collection: 'jogadores'}); 

  