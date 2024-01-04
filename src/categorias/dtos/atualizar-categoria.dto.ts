import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsOptional } from 'class-validator';
import {Evento} from '../interface/categoria.interface';

export class AtualizarCategoriaDto{

 @IsString()
 @IsOptional()
  descricao: String;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}

//Eventos sera dinamico