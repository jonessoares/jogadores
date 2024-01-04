import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { DesafioStatus } from './desafio-status-enum';
import { Partida } from 'src/partidas/interface/partida.interface';


export interface Desafio extends Document{
  dataHoraDesafio: Date
  jogadores: Array<Jogador>
  dataHoraSolicitacao: Date
  dataHoraResposta: Date
  status: DesafioStatus
  solicitante: Jogador 
  categoria: String 
  partida: Partida
}

















