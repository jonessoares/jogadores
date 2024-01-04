import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';
import {Evento} from '../interface/categoria.interface';

export class CriarCategoriaDto{ //ha menos atr. passado q a interface Jogador
    @IsString()
    @IsNotEmpty()
    readonly categoria: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;
 
    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>;
}