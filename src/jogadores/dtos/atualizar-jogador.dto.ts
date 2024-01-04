import { IsNotEmpty } from 'class-validator';

export class AtualizarJogadorDto{ //email nao passado para atualizar
    @IsNotEmpty()
    readonly celular: String;
  
    @IsNotEmpty()
    readonly nome: String;
}