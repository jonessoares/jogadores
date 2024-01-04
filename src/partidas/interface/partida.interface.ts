import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export interface Partida extends Document{
    categoria: String
    jogadores: Array<Jogador>
    def: Jogador  //definiu / venceu
    resultado: Array<Resultado>  //qtd set
  }
  
export interface Resultado extends Document{
    set: String;   //qual set
  }