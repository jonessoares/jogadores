import { IsNotEmpty, IsEmail } from 'class-validator';

export class CriarJogadorDto{ 
    @IsNotEmpty()
    readonly nome: String;
    @IsEmail()
    readonly email: String;
    @IsNotEmpty()
    readonly celular: String;
}