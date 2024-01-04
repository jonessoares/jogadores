import * as mongoose from 'mongoose';

export const DesafioSchema = new mongoose.Schema({
    dataHoraDesafio: {type: Date},
    dataHoraSolicitacao: {type: Date},
    dataHoraResposta: {type: Date},
    status: {type: String},
    solicitante: {type: mongoose.Schema.Types.ObjectId, ref: "Jogador"},
    categoria: { type: String },
    jogadores: [{  //armaz N  []
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Jogador"
    }],
    partida: {   //armaz 1 {}
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partida"
    },
}, {timestamps: true, collection: 'desafios'})

















