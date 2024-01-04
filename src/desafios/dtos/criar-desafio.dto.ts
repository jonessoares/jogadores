import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsDate, ArrayMaxSize, IsDateString } from 'class-validator';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export class CriarDesafioDto{

    @IsDateString()
    @IsNotEmpty()
    readonly dataHoraDesafio: Date;

    @IsNotEmpty()
    readonly solicitante: Jogador;

   // @IsDate()
   // @IsNotEmpty()
   // readonly dataHoraSolicitacao: Date;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    readonly jogadores: Array<Jogador>;
    
   // @IsString()
   // @IsNotEmpty()
   // readonly categoria: String;
}

