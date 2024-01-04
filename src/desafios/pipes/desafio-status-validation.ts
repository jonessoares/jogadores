import { PipeTransform, BadRequestException } from "@nestjs/common";
import { DesafioStatus } from "../interface/desafio-status-enum";

export class DesafioStatusValidacaoPipe implements PipeTransform{
    readonly statusPermitidos = [
        DesafioStatus.ACEITO,
        DesafioStatus.NEGADO,
        DesafioStatus.CANCELADO
    ];

    transform(value: any){
        const status = value.status.toUpperCase();  //valores body

        if(!this.ehStatusValido(status)){
            throw new BadRequestException(`O status ${status} não é permitido`);
        }

        return value;
    }

    private ehStatusValido(status: any){
        const idx = this.statusPermitidos.indexOf(status);

        return idx == -1 
    }
}






