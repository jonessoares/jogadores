import * as mongoose from 'mongoose';


export const CategoriaSchema = new mongoose.Schema({
    categoria: {type: String, unique: true},
    descricao:  String,
    eventos:[ {nome: {type: String}, operacao: {type: String}, valor: { type: Number} } ],
    jogadores: [{type: mongoose.Schema.Types.ObjectId,  ref: 'Categoria'}], 
},  {timestamps: true, collection: 'categorias'});
 


//Evento  - Array obj  chaves tipos
//Jogadores - Array  obj  tipo_Id  ref(referencia)